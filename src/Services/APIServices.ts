

export const NewsAPI_Service = async (source: string = '', categories: string = '', authors: string = '', page: number = 1, pageSize: number = 10) => {
    try {
        const apiKey: string = 'apiKey=70b1e068f7c44d46a6060ec2b0c90adc';
        let url: string = 'https://newsapi.org/v2/top-headlines';
        if(source !== '' || categories !== '') {
            url += `?sources=${source}&category=${categories}&page=${page}&pageSize=${pageSize}&${apiKey}`;
        }
        else {
            url += `?page=${page}&pageSize=${pageSize}&${apiKey}`;
        }
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return new Error('error');
    }
}

export const TheGuardian_Service = async (source: string = '', categories: string = '', authors: string = '', page: number = 1, pageSize: number = 10) => {
    try {
        const apiKey: string = 'api-key=test';
        let url: string = 'https://content.guardianapis.com/search';
        if(source !== '' || categories !== '') {
            url += `?sources=${source}&q=${categories}&page=${page}&page-size=${pageSize}&${apiKey}`;
        }
        else {
            url += `?page=${page}&page-size=${pageSize}&${apiKey}`;
        }
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return new Error('error');
    }
}

export const NewYorkTimes_Service = async (categories: string = '', page: number = 1) => {
    try {
        const apiKey: string = 'api-key=2OMHpKDtUsBDI3MsDJ7qHsB0l45rgOWx';
        let url: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        if(categories !== '') {
            url += `?q=${categories}&page=${page}&${apiKey}`;
        }
        else {
            url += `?page=${page}&${apiKey}`;
        }
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return new Error('error');
    }
}