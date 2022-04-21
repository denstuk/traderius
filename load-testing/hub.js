import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    group('User: Authentication -> Receive News -> Get Analysis', (_) => {
        const loginPayload = {
            credential: 'loadtest',
            password: 'test',
        }

        const login = http.post('http://localhost:8000/api/')
    });
}
