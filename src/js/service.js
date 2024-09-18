const url = "https://data-lesson-13.vercel.app";

export const getPhones = async () => {
    try {
        const res = await fetch(`${url}/phones`);
        const data = await res.json();
        return data;
    } catch (error) {
        return error.message;
    }
};


export const getNotebook = async () => {
    try {
        const res = await fetch(`${url}/notebook`);
        const data = await res.json();
        return data;
    } catch (error) {
        return error.message;
    }
};

export const infoPhones = async (dataId) => {
    try {
        const res = await fetch(`${url}/phones/${dataId}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return error.message;
    }
};

export const infoNotebook = async (dataId) => {
    try {
        const res = await fetch(`${url}/notebook/${dataId}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return error.message;
    }
};