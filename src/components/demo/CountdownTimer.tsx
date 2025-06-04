"use client"

import { useCallback, useEffect, useState } from "react"


export interface Timer {
    hour: number
    min: number
    sec: number
}

const defaultTimer: Timer = {
    hour: 0,
    min: 0,
    sec: 0
}

const updateTimer = (input: Timer): Timer | null => {
    if (input.sec > 0) {
        return { ...input, sec: input.sec - 1 }
    } else if (input.min > 0) {
        return { ...input, sec: 59, min: input.min - 1 }
    } else if (input.hour > 0) {
        return { ...input, hour: input.hour - 1, sec: 59, min: 59 }
    } else {
        return null
    }
}

const formateTimer = (value: number): string => value > 9 ? value.toString() : `0${value}`
export const TimerDemo = () => {
    const [isPlay, setIsplay] = useState<boolean>(false)
    const [timer, setTimer] = useState<Timer>(defaultTimer)

    useEffect(() => {
        const Timer = localStorage.getItem("timer")
        if (Timer) {
            setTimer(JSON.parse(Timer))
        }
    }, [])


    useEffect(() => {
        if (isPlay) {
            const id = setInterval(() => {
                setTimer(prevTimer => {
                    const newTimer = updateTimer(prevTimer);
                    if (newTimer) {
                        localStorage.setItem("timer", JSON.stringify(newTimer))
                        return newTimer;
                    } else {
                        setIsplay(false);
                        return defaultTimer;
                    }
                });
            }, 1000);

            return () => clearInterval(id);
        }
    }, [isPlay])



    const resetTimer = useCallback(() => { setTimer(defaultTimer); setIsplay(false) }, [])
    return (
        <div className="w-full h-screen flex items-center justify-center flex-col">
            <form className="flex gap-2 w-96">
                <input placeholder="Hour" className="w-30 p-2 mr-2" type="number" min={0} onChange={(e) => setTimer((t) => ({ ...t, hour: parseInt(e.target.value) }))} value={formateTimer(timer.hour)} />
                <input placeholder="Min" className="w-30 p-2 mr-2" type="number" min={0} max={60} onChange={(e) => setTimer((t) => ({ ...t, min: parseInt(e.target.value) }))} value={formateTimer(timer.min)} />
                <input placeholder="Second" className="w-30 p-2 mr-2" type="number" min={0} max={60} onChange={(e) => setTimer((t) => ({ ...t, sec: parseInt(e.target.value) }))} value={formateTimer(timer.sec)} />
            </form>
            <div className="w-96 mt-5 gap-1">
                <button className="border bg-green-500 p-1.5 mr-2 w-[45%]" onClick={() => setIsplay((e) => !e)} >{isPlay ? "Pause" : "start"}</button>
                <button className="border bg-red-500 p-1.5 mr-2 w-[45%]" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    )
}

// extensions 
// Multiple Timers in Parallel
// Timers in Background Tabs
// Sync Timers Across Tabs 