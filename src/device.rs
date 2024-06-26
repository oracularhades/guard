use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use rocket_db_pools::{Database, Connection};
use rocket_db_pools::diesel::{MysqlPool, prelude::*};
use rocket::http::{Status, CookieJar, Cookie};
use rocket::response::status;

use diesel::sql_query;
use diesel::prelude::*;
use diesel::sql_types::*;

use crate::global::{send_email, generate_random_id, get_epoch};
use crate::responses::*;
use crate::structs::*;
use crate::tables::*;
use hades_auth::*;
use std::error::Error;
use std::net::SocketAddr;

use crate::{CONFIG_VALUE, SQL_TABLES};

// Some authenticatiom methods, such as email require action (such as sending a magiclink) before the user can present credentials to authenticate. This is where that logic is kept.

pub async fn device_get(mut db: Connection<Db>, id: String) -> Result<(Option<Guard_devices>, Connection<Db>), Box<dyn Error>> {
    let sql: Config_sql = (&*SQL_TABLES).clone();

    let query = format!("SELECT id, user_id, authentication_method, collateral, public_key, created FROM {} WHERE id=?", sql.device.unwrap());

    let result: Vec<Guard_devices> = sql_query(query)
    .bind::<Text, _>(id)
    .load::<Guard_devices>(&mut db)
    .await
    .expect("Something went wrong querying the DB.");

    if (result.len() == 0) {
        // Device not found.
        return Ok((None, db));
    }

    let device = result[0].clone();

    Ok((Some(device), db))
}

pub async fn device_create(mut db: Connection<Db>, user_id: String, authentication_method_id: String, collateral: Option<String>, public_key: String) -> Result<(String, Connection<Db>), Box<dyn Error>> {
    let device_id = generate_random_id();

    let sql: Config_sql = (&*SQL_TABLES).clone();
    let query = format!("INSERT INTO {} (id, user_id, authentication_method, collateral, public_key, created) VALUES (?, ?, ?, ?, ?, ?)", sql.device.unwrap());
    let result = sql_query(query)
    .bind::<Text, _>(device_id.clone())
    .bind::<Text, _>(user_id.clone())
    .bind::<Text, _>(authentication_method_id.clone())
    .bind::<Text, _>(collateral.unwrap_or("".to_string()))
    .bind::<Text, _>(public_key.clone())
    .bind::<BigInt, _>(get_epoch())
    .execute(&mut db)
    .await
    .expect("Something went wrong querying the DB.");

    Ok((device_id, db))
}

pub fn device_guard_static_auth_from_cookies(jar: &CookieJar<'_>) -> Option<String> {
    let mut signed_data: String = String::new();

    if (jar.get("guard_static_auth").is_none() == false) {
        signed_data = jar.get("guard_static_auth").map(|c| c.value()).expect("Failed to parse signed_data.").to_string();
        println!("Signed_data cookie: {:?}", signed_data);
    } else {
        println!("Signed_data cookie: None");
        return None;
    }

    return Some(signed_data);
}

pub async fn device_authentication(db: Connection<Db>, signed_data: String) -> (Option<Guard_devices>, Connection<Db>) {
    let unsigned_data: Static_auth_sign = serde_json::from_value(get_unsafe_noverification_jwt_payload(signed_data.clone()).expect("Failed to parse payload.")).expect("Failed to prase JWT");
    
    // TODO: Instead of things like .expect("Missing additional data"), return an actual response.
    let unsigned_data_deviceinfo: Signed_data_identifier = serde_json::from_value(unsigned_data.additional_data.expect("Missing additional data")).expect("Failed to parse identifier data.");
    
    let device_id = unsigned_data_deviceinfo.device_id;
    let (device_wrapped, db) = device_get(db, device_id).await.expect("Failed to query for device.");
    let device = device_wrapped.expect("Device not found");

    let output = static_auth_verify(signed_data, device.public_key.clone()).await;

    // We use is_none() here, because we're expecting additional data.
    if (output.is_err() == true || output.expect("Missing result").is_none() == true) {
        // Invalid static auth.
        println!("Invalid static auth");
        return (None, db);
    }

    return (Some(device), db);
}