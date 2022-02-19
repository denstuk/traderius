import React from "react";

export const useRequest = <T>(fetchMethod: Function, params?: any) => {
    const [data, setData] = React.useState<T | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(true);

    const load = async function() {
        const data = await fetchMethod(params);
        setData(data);
        setLoading(false);
    }

    return { data, load, loading };
}