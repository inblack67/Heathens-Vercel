import { useMemo, useRef } from "react";

export const useComponentWillMount = ( fn: Function ) =>
{
    const willMount = useRef( true );
    if ( willMount.current )
    {
        fn();
    }
    willMount.current = false;
};

export const useComponentWillMount2 = ( fn: Function ) =>
{
    useMemo( fn(), [] );
};