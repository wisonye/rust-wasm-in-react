import React, { useState, useEffect } from 'react'
import './App.css';

/**
 * @export
 * @interface AppProps
 */
export interface AppProps {
    classes?: any
}

/**
 * 
 * @param {App}Props props 
 */
const App = (props: AppProps) => {
    const { classes } = props

    const [state, setState] = useState()

    useEffect(() => {
        console.log(`App is running.....>:)`)
        const rust_wasm = import('wasm');
        rust_wasm
            .then(w => {
                w.test_log()

                // This wasm panic will be caught by `catch` block below
                // w.test_panic()
            })
            .catch(error => {
                console.log(`Error happaned: `, error)
            })
    }, [])

    return (
        <div className="App">
            <canvas id="render-canvas"></canvas>
        </div>
    )
}

export default App;
