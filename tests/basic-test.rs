use wasm_bindgen_test::*;
use use_rust_in_react;

#[wasm_bindgen_test]
fn should_pass() {
    use_rust_in_react::test_log();
    // assert_eq!(1, 1);
}

// #[wasm_bindgen_test]
// fn should_fail() {
    // assert_eq!(1, 2);
// }
