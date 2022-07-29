//Метод отображения всех пользователей и сама таблица
$(document).ready(showAll());

function showAll() {
    if ($('#usersTableNav').hasClass('active') === false) {
        $('#usersTableNav').addClass('active');
        $('#newUserNav').removeClass('active');
    }

    $('#basicSpace').empty();
    $('#basicSpace').append(
        `<h6 class="card-header">All users</h6>
        <div class="card-body table-responsive">
            <table class="table table-striped table-sm">
                <thead id="thead">
                    <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Age</th>
                <th>E-mail</th>
                <th>Role</th>
            </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
            </table>
        </div>`
    );


    $.getJSON('https://localhost:8443/api/', function (json) {

        let tr = [];

        for (let i = 0; i < json.length; i++) {

            let user = {
                id: json[i].id,
                username: json[i].username,
                surname: json[i].surname,
                age: json[i].age,
                email: json[i].email,
                password: json[i].password,
                userRole: JSON.stringify(json[i].roles.map(role => role.authority))
            };

            tr.push(`<tr id="${user.id}">`);
            tr.push(`<td>${user.id}</td>`);
            tr.push(`<td>${user.username}</td>`);
            tr.push(`<td>${user.surname}</td>`);
            tr.push(`<td>${user.age}</td>`);
            tr.push(`<td>${user.email}</td>`);
            tr.push(`<td>${user.userRole}</td>`);

            tr.push(`<td><button class="btn btn-primary" onclick="modalEditFunc(${user.id})">Edit</button></td>`);
            tr.push(`<td><button class="btn btn-danger" onclick="modalDeleteFunc(${user.id})">Delete</button></td>`);
            tr.push(`</tr>`);
        }

        $('#tbody').empty();
        $('#tbody').append($(tr.join('')));
    });
}

// Отображение формы создания нового пользователя
function newUser() {
    if ($('#newUserNav').hasClass('active') === false) {
        $('#newUserNav').addClass("active");
        $('#usersTableNav').removeClass('active');
    }
    $('#basicSpace').empty();
    $('#basicSpace').append(
        `<h6 class="card-header">Add new user</h6>
    <div class="card-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4"></div>
                <form class="col-md-4 text-center font-weight-bold" id="newUserForm">
                    <label>First Name</label>
                    <input type="text" id="username_id" class="form-control"
                           placeholder="First Name" required/>

                    <label>Last Name</label>
                    <input type="text" id="surname_id" class="form-control"
                           placeholder="Last Name" required/>

                    <label>Age</label>
                    <input type="text" id="age_id" class="form-control"
                           placeholder="Age" required/>

                    <label>E-mail</label>
                    <input type="text" id="email_id" class="form-control "
                           placeholder="E-mail" required/>

                    <label>Password</label>
                    <input type="text" id="password_id" class="form-control"
                           placeholder="Password" required/>

                    <hr>
                        <label for="selectRoles">Select roles</label>
                        <select class="form-control" multiple id="selectRoles" required
                                size="2">
                            <option value="1">ADMIN</option>
                            <option value="2">USER</option>
                        </select>

                        <br>
                            <button class="btn btn-success" type="submit" onclick="saveUser();
                            return false">
                            Add new user
                            </button>
                </form>
                <div class="col-md-4"></div>
            </div>
        </div>
    </div>`);

}

//Отправка формы нового пользователя на контроллер

function saveUser() {

    let selectedRoles = window.document.querySelectorAll('#selectRoles option:checked');
    let roleSet = new Set();


    for (let i = 0; i < selectedRoles.length; i++) {
        selectedRoles[i].value === "1"
            ? roleSet.add({"id": 1, "authority": "ADMIN"})
            : roleSet.add({"id": 2, "authority": "USER"})
    }


    let user = {
        username: $("#username_id").val(),
        surname: $("#surname_id").val(),
        age: $("#age_id").val(),
        email: $("#email_id").val(),
        password: $("#password_id").val(),
        roles: Array.from(roleSet)

    };


    if (!(Object.values(user)).includes(null)) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: 'https://localhost:8443/api/save',
            data: JSON.stringify(user),
            dataType: "json",
            cache: false,
            success: function () {
                showAll();
            }
        });
    }

}

//Модальное окно с формой редактирования пользователя

function modalEditFunc(id) {
    $.getJSON('https://localhost:8443/api/' + id, function (json) {
        let user = {
            id: json.id,
            username: json.username,
            surname: json.surname,
            age: json.age,
            email: json.email,
            password: json.password,
            userRole: json.roles.map(role => role.authority)
        };

        let modal = document.getElementById('modalWindow');

        modal.innerHTML =
            `<div class="modal fade" id="modalEdit" tabindex="-1"
                 aria-hidden="true"
                 aria-labelledby="modalEdit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="modalEditLabel">Edit user</h6>
                            <button type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="font-weight-bold">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <form class="text-center" id="formEdit">
                                        <div class="form-group">
                                            <label for="eID">ID</label>
                                            <input class="form-control" type="number" id="eID" name="id" value="${user.id}" readOnly/>
                                        </div>

                                        <div class="form-group">
                                        <label for="eUsername">FirstName</label>
                                        <input class="form-control" type="text" id="eUsername" name="username" value="${user.username}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eSurname">LastName</label>
                                            <input class="form-control" type="text" id="eSurname" name="surname" value="${user.surname}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eAge">Age</label>
                                            <input class="form-control" type="text" id="eAge" name="age" value="${user.age}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eEmail">E-mail</label>
                                            <input class="form-control" type="text" id="eEmail" name="email" value="${user.email}"/>
                                        </div>

                                        <label for="ePassword">Password</label>
                                        <input class="form-control" type="text" id="ePassword" name="password" value="${user.password}" />

                                        <div class="form-group">
                                            <label for="eSelectRoles">ROLE</label>
                                            <select class="form-control" name="selectRoles[]" multiple id="eSelectRoles" size="2" required>
                                                <option value="1">ADMIN</option>
                                                <option value="2">USER</option>
                                            </select>
                                         </div>
                                    </form>
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="btn-block text-right">
                                <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Close"/>
                                <input class="btn btn-primary" type="submit" onclick="updateUser(); return false" 
                                data-dismiss="modal" value="Edit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        $('#modalEdit').modal();
    });
}

// //Отправка формы отредактированного пользователя на контроллер

function updateUser() {
    let selectedRoles = window.document.querySelectorAll('#eSelectRoles option:checked');
    let roleSet = new Set();

    for (let i = 0; i < selectedRoles.length; i++) {
        selectedRoles[i].value === "1"
            ? roleSet.add({"id": 1, "userRole": "ADMIN"})
            : roleSet.add({"id": 2, "userRole": "USER"})
    }

    let user = {
        id: $("#eID").val(),
        username: $("#eUsername").val(),
        surname: $("#eSurname").val(),
        age: $("#eAge").val(),
        email: $("#eEmail").val(),
        password: $("#ePassword").val(),
        roles: Array.from(roleSet)
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        url: 'https://localhost:8443/api/update/' + user.id,
        data: JSON.stringify(user),
        dataType: 'json',
        cache: false,
        success: function () {
            showAll();
        }
    })
}

//Модальное окно с формой для удаления пользователя

function modalDeleteFunc(id) {
    $.getJSON('https://localhost:8443/api/' + id, function (json) {
        let user = {
            id: json.id,
            username: json.username,
            surname: json.surname,
            age: json.age,
            email: json.email,
            password: json.password,
            userRole: json.roles.map(role => role.authority)
        };

        let modal = document.getElementById('modalWindow');

        modal.innerHTML =
            `<div class="modal fade" id="modalDelete" tabindex="-1"
                 aria-hidden="true"
                 aria-labelledby="modalDelete">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="modalDeleteLabel">Delete user</h6>
                            <button type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="font-weight-bold">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <form class="text-center" id="formDelete">
                                        <fieldset disabled>
                                            <div class="form-group">
                                                <label for="dID">ID</label>
                                                <input class="form-control" type="number" id="dID" name="id" value="${user.id}" readonly/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dUsername">FirstName</label>
                                                <input class="form-control" type="text" id="dUsername" name="username" value="${user.username}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dSurname">LastName</label>
                                                <input class="form-control" type="text" id="dSurname" name="surName" value="${user.surname}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dAge">Age</label>
                                                <input class="form-control" type="text" id="dAge" name="age" value="${user.age}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dEmail">E-mail</label>
                                                <input class="form-control" type="text" id="dEmail" name="email" value="${user.email}"/>
                                            </div>

                                            <div class="form-group">
                                                <label for="dPassword">Password</label>
                                                <input class="form-control" type="text" id="dPassword" name="password" value="${user.password}" />
                                            </div>

                                            <div class="form-group">
                                            <label for="dSelectRoles">ROLE</label>
                                            <select class="form-control" name="selectRoles[]"
                                                    multiple
                                                    id="dSelectRoles" size="2">
                                                <option value="1">ADMIN</option>
                                                <option value="2">USER</option>
                                            </select>
                                            </div>
                                        </fieldset>
                                    </form>
                                <div class="col-md-3"></div>
                            </div>

                        </div>

                        <div class="modal-footer">
                            <div class="btn-block text-right">
                                <input type="button" class="btn btn-secondary"
                                       data-dismiss="modal" value="Close"/>
                                <input class="btn btn-danger"
                                       onclick="deleteUser(); return false;"
                                       data-dismiss="modal"
                                       type="button"
                                       value="Delete"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        $('#modalDelete').modal();
    });
}

// Отправка формы удаляемого пользователя на контроллер

function deleteUser() {

    let id = $("#dID").val();

    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        url: 'https://localhost:8443/api/delete' + id,
        data: JSON.stringify(id),
        dataType: 'json',
        cache: false,
        success:
            $('#' + id).remove()
    })
}
