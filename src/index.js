import { Api } from './api';
import './styles/style.css';



const root = $('#root');

const renderAddBtn = (button) => `<button type="submit" class="btn add-room_btn">${button}</button>`;
const renderBackBtn = () => `<button class="btn back_btn">< Back</button>`;
const renderTable = (data) => {
    let rows = data.reduce((accum, reducer) => {
        return accum + `<tr class="row" roomName="${reducer.name}"><td>${reducer.countryName}</td><td>${reducer.name}</td></tr>`
    }, '');
    let table = `<div class="table-wrapper"><h2>Rooms list</h2><table class="table"><tr><th>Country Name</th><th>Name</th></tr>${rows}</table></div>`;
    root.append(table);
};

const renderForm = () => root.append(`<form class="add-room_form">
                                        <label class="label room-label">Enter room name<input name="room" type="text" placeholder="room name"/></label>
                                         <label class="label room-label">Enter ip<input name="ip" type="text" placeholder="ip" /></label>
                                        ${renderAddBtn('Add room')}
                                      </form>`);

const renderCheckForm = (name) => root.append(`
                                       ${renderBackBtn()}
                                      <form class="enter_form">
                                        <label class="label room-label"><input disabled name="roomName" type="text" placeholder="room name" value="${name}"/></label>
                                         <label class="label room-label">Enter ip<input name="ip" type="text" placeholder="ip" /></label>
                                        ${renderAddBtn('Enter')}
                                      </form>`);

const renderLightCheckbox = (res = '') =>  root.append(`${renderBackBtn()}<h2>Light status</h2><div><span class="light-status">${res.lightStatus}</span></div><button class="btn toggle-btn" name="${res.name}">Toggle light</button>`);

const listeners = () => {
    root.on('click', '.add-room_form button', function(e) {
        e.preventDefault();
        const data = {
            room: $('.add-room_form input[name=room]').val(),
            ip: $('.add-room_form input[name=ip]').val()
        };
        Api.addRoom(data).then(res => {
            $('.add-room_form')[0].reset();
            getAllRooms();
        });
    });

    root.on('click', '.enter_form button', function(e) {
        e.preventDefault();
        const data = {
            roomName: $('.enter_form input[name=roomName]').val(),
            ip: $('.enter_form input[name=ip]').val()
        };
        Api.checkRights(data).then(res => innerRoomPage(res)).catch(err => alert('Access denied'))
    });

    root.on('click', '.table .row', function(e) {
        innerCheckPage($(this).attr('roomName'))
    });

    root.on('click', '.back_btn', function(e) {
        initialPage();
    });

    root.on('click', '.toggle-btn', function(e) {
        Api.toggleLight($(this).attr('name')).then(res => $('.light-status').text(res.lightStatus));
    });


};

listeners();

initialPage();

function innerCheckPage(name) {
    root.html('');
    renderCheckForm(name);
}

function innerRoomPage(res) {
    root.html('');
    renderLightCheckbox(res);
}

function initialPage() {
    root.html('');
    renderForm();
    getAllRooms();
}

function getAllRooms() {
    $('.table-wrapper').remove();
    Api.getRooms()
        .then(res => renderTable(res))
        .catch(err => alert('Ooops, something went wrong '));
}

