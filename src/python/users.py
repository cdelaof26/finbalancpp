from db_conf import get_db_connection
from flask import request, jsonify
from flask import Blueprint
from utils import any_is_none

user_routes = Blueprint('users', __name__)


@user_routes.route('/api/user', methods=['POST'])
def get_user_data():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select nombre, correo from usuario where id = %d;" % user_id)
    rows = cursor.fetchall()
    column_names = ["userName", "mail"]

    cursor.close()
    connection.close()

    response_data = [dict(zip(column_names, row)) for row in rows]
    response = jsonify(response_data[0])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@user_routes.route('/api/authUser', methods=['POST'])
def auth_user():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    mail = data.get('mail')
    password = data.get('password')
    if any_is_none(mail, password):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select * from usuario where correo='%s' and contrasena='%s';" % (mail, password))
    # cursor.execute("SELECT * FROM Usuario;")
    rows = cursor.fetchall() # ['id', 'nombre', 'correo', 'contrasena']
    # column_names = [desc[0] for desc in cursor.description]

    cursor.close()
    connection.close()

    if len(rows) == 1:
        response, code = jsonify(message="Usuario encontrado", userId=rows[0][0]), 200
    else:
        response, code = jsonify(message="Error: Usuario no encontrado"), 404

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, code


@user_routes.route('/api/register', methods=['POST'])
def create_user():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user = data.get("userName")
    mail = data.get("mail")
    password = data.get("password")
    if any_is_none(user, mail, password):
        return jsonify(message="Missing "), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("insert into usuario (nombre, correo, contrasena) values ('%s', '%s', '%s');" % (user, mail, password))
    connection.commit()

    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@user_routes.route('/api/editUser', methods=['POST'])
def edit_user():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    user_property = data.get('property')
    value = data.get('value')
    if any_is_none(user_id, user_property, value):
        return jsonify(message="Missing "), 400

    table_property = ""
    prop_format = "'%s'"
    if user_property == "userName":
        table_property = "nombre"
    elif user_property == "mail":
        table_property = "correo"
    elif user_property == "pass":
        table_property = "contrasena"

    prop_format = prop_format % value
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("update usuario set %s = %s where id = %s;" % (table_property, prop_format, user_id))

    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200
