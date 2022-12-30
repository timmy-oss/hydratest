import React from "react";
import { useState, useEffect } from "react";

function RouterLoader({ active = true }) {
    const [p, setP] = useState(0);
    const [w, setW] = useState(0);

    useEffect(() => {
        if (!active) return;

        let id = setTimeout(() => {
            const m = 100;
            let n = p;

            if (n >= m) {
                //   n -= 2 * m;
                n = 0;
            }

            setP(n + 1.5);
            setW(35 - 35 * (Math.max(0, n - w) / m));
            //   console.log(p)
        }, 5);

        return () => {
            clearTimeout(id);
        };
    }, [p, active]);

    if (!active) return null;

    return (
        <div className=" bg-white pb-4 z-20 fixed top-0 left-0 right-0">
            <div className="w-full relative  h-[5px]   bg-[#5823B7]/20 rounded">
                <div
                    style={{
                        left: `${p}%`,
                        width: `${w}%`,
                    }}
                    className=" absolute  top-0 bottom-0  h-full bg-gradient-to-r from-[#5823B7] via-[#5823B7]/20 to-[#5823B7]/20 rounded"
                ></div>
            </div>
        </div>
    );
}

export default RouterLoader;
