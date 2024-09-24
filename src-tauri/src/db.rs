use std::fs;
use std::path::{Path, PathBuf};

// Check if a database file exists, and create or copy one if it does not.
pub fn init() {
    if !db_file_exists() {
        copy_db_file_from_source();
    }
}

// Copy the database file from the source (same directory as this file) to the target location.
fn copy_db_file_from_source() {
    let db_path = get_db_path();
    let db_dir = Path::new(&db_path).parent().unwrap();

    // If the parent directory does not exist, create it.
    if !db_dir.exists() {
        fs::create_dir_all(db_dir).unwrap();
    }

    // Path to the source database file (same directory as db.rs)
    let src_db_path = get_source_db_path();

    // Print source and destination paths for debugging
    println!("Source database path: {:?}", src_db_path);
    println!("Destination database path: {:?}", db_path);

    // Check if the source file exists
    if !src_db_path.exists() {
        panic!("Source database file not found: {:?}", src_db_path);
    }

    // Copy the source file to the target location.
    fs::copy(src_db_path, db_path).expect("Failed to copy the database file");
}

// Check whether the database file exists.
fn db_file_exists() -> bool {
    let db_path = get_db_path();
    Path::new(&db_path).exists()
}

// Get the path where the database file should be located.
fn get_db_path() -> String {
    let home_dir = dirs::config_dir().unwrap();
    home_dir.to_str().unwrap().to_string() + "/com.tauri.dev/database.gpkg"
}

// Get the path to the source database file (same directory as this source file).
fn get_source_db_path() -> PathBuf {
    let src_dir = std::env::current_dir().unwrap(); // Get the current directory
    src_dir.join("database.gpkg") // Assuming the source file is named "database.gpkg"
}
