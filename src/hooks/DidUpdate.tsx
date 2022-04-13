import { useEffect, useRef } from "react";

const useDidUpdate = (cb: () => void, arg: string | null) =>{
    const check = useRef<boolean>(false)

    useEffect(()=>{
        if(check.current) cb()
        else check.current=true
    },[arg])

}

export default useDidUpdate