import { environment } from "./environment";

export class Api {


    static getRooms() {
        return Api.request({
            url: environment.BASE_URL + '/room/all',
            dataType: 'json',
        });
    }

    static addRoom({ ip, room }) {
        return Api.request({
            method: 'post',
            url: environment.BASE_URL + `/room/create?ip=${ip}&room=${room}`,
            dataType: 'json',
            data: {}
        })
    }

    static checkRights({ ip, roomName }) {
        return Api.request({
            url: environment.BASE_URL + `/room/get?ip=${ip}&roomName=${roomName}`,
            dataType: 'json',
        });
    }

    static toggleLight(roomName) {
        return Api.request({
            url: environment.BASE_URL + `/room/get/update?roomName=${roomName}`,
            dataType: 'json',
        });
    }

    static request(conf) {
        return new Promise((resolve, reject) => {
            $.ajax(conf).done((res) => { resolve(res)}).fail(err => reject(err))
        })
    }

}