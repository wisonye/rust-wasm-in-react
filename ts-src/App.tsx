import React, { useEffect } from 'react'
import './App.css';

/**
 * @export
 * @interface AppProps
 */
export interface AppProps {
    classes?: any
}

/**
 * Setup WebGL running environment
 */
const setupWebGl = (rust_wasm: any) => {
    const canvas = document.getElementById('render-canvas')
    const gl = canvas ? (canvas as any).getContext('webgl', { antialias: true }) : undefined;

    console.log(`gl: `, gl)

    if (!gl) {
        alert(`Fail to setup WebGL`)
        return;
    }

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const FPS = 30.0 // Frames per seconds we want
    const FPS_THROTTLE = 1000.0 / FPS; // Millsenconds / frames
    let lastDrawTime = -1; // In milliseconds

    const rustLogo = new rust_wasm.RustLogo() 
    const initTime = Date.now()

    const gl_render = () => {
        (window as any).requestAnimationFrame(gl_render)
        const currTime = Date.now()

        // Only update and render in FPS rate
        if (currTime >= lastDrawTime + FPS_THROTTLE) {
            lastDrawTime = currTime

            // Resize the `Canvas` when window size changed:
            //
            // At this moment, we use the full screen. But when we embed a React app,
            // we should calculate and cut the App component size for the `Canvas` render
            // area!!!
            if (window.innerHeight !== (canvas as any).height || window.innerWidth !== (canvas as any).width) {
                (canvas as any).height = window.innerHeight;
                // (canvas as any).clientHeight = window.innerHeight;
                (canvas as any).style.height = window.innerHeight;

                (canvas as any).width = window.innerWidth;
                // (canvas as any).clientWidth = window.innerWidth;
                (canvas as any).style.width = window.innerWidth;

                gl.viewport(0, 0, window.innerHeight, window.innerWidth)
            }

            let elapsedTime = currTime - initTime
            rustLogo.update(elapsedTime, window.innerWidth, window.innerWidth)
            rustLogo.render()
        }
    }

    gl_render()

    console.log(`WebGL setup done >>>>>>`)
}

/**
 * 
 * @param {App}Props props 
 */
const App = (props: AppProps) => {
    // const { classes } = props
// 
    // const [state, setState] = useState()

    useEffect(() => {
        console.log(`App is running.....>:)`)
        const rust_wasm = import('wasm');
        rust_wasm
            .then(w => {
                setupWebGl(w)
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
