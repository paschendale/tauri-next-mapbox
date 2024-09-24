import Database from "@tauri-apps/plugin-sql";
// when using `"withGlobalTauri": true`, you may use
// const V = window.__TAURI_PLUGIN_SQL__;

async function getDatabase() {
  try {
    return await Database.load("sqlite:database.gpkg");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNycZipCodes() {
  try {
    const db = await getDatabase();

    const nycZipCodes = await db.select("SELECT * FROM zip_code_nyc");

    return nycZipCodes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
