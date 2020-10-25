// extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// --------------- Let compile shows that all functions below are from js `console` ---------------
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(content: &str);
}

/// For more

// --------------- Auto execute start point when WASM has been loaded -----------------------------
/// For more details, plz have a look at
/// [here](https://rustwasm.github.io/docs/wasm-bindgen/reference/attributes/on-rust-exports/start.html)
///
/// For more details about `#[wasm_bindgen]` can do on Rust export, plz have a look at
/// [here](https://rustwasm.github.io/docs/wasm-bindgen/reference/attributes/on-rust-exports/index.html)
#[wasm_bindgen(start)]
pub fn start() {
    log("WASM auto executable code >>>>>>>>>>>.");
}

// --------------- Export WASM funcitons ----------------------------------------------------------
#[wasm_bindgen]
pub fn test_log() {
    log("WASM function from Rust >>>>>>>>>>>>>.");
}

#[wasm_bindgen]
pub fn test_panic() {
    panic!("Panic from rust >>>>>>>>>>>>>>>>>.");
}


// --------------- WebGL relate stuff -------------------------------------------------------------
#[wasm_bindgen]
pub struct RustLogo {

}

#[wasm_bindgen]
impl RustLogo {

    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        log("RustLog.new() called >>>>>>>>>>>>>>>>");

        Self {}
    }

    pub fn update(&mut self, _time: f32, _height: f32, _width: f32) -> Result<(), JsValue> {
        log("RustLog.update() called >>>>>>>>>>>>>>");
        Ok(())
    }

    pub fn render(&self) {}
}
