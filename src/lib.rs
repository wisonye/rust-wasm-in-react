// extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

// Let compile shows that all functions below are from js `console`
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(content: &str);
}


// Export WASM funcitons
#[wasm_bindgen]
pub fn test_log() {
    log("WASM function from Rust >>>>>>>>>>>>>.");
}
