from db_conf import get_db_connection
from flask import request, jsonify
from flask import Blueprint
from utils import any_is_none

investments_routes = Blueprint('investments', __name__)


@investments_routes.route('/api/investments', methods=['POST'])
def get_investments():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select id, nombre, montoInvertido, rendimiento, fechaInicio, fechaFin, tipo "
                   "from inversiones where idUsuario = %d;" % user_id)
    rows = cursor.fetchall()
    column_names = ["id", "caption", "value",
                    "performance", "investmentDate", "investmentTimeHorizon",
                    "investmentType"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@investments_routes.route('/api/createInvestment', methods=['POST'])
def create_investment():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    caption = data.get('caption')
    value = data.get('value')
    performance = data.get('performance')
    investment_date = data.get('investmentDate')
    investment_time_horizon = data.get('investmentTimeHorizon')
    investment_type = data.get('investmentType')
    user_id = data.get('userId')
    if any_is_none(caption, value, performance, investment_date, investment_time_horizon, investment_type, user_id):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    date_format = "STR_TO_DATE('" + investment_date + "', '%Y-%m-%d')"
    date_format1 = "STR_TO_DATE('" + investment_time_horizon + "', '%Y-%m-%d')"
    cursor.execute("insert into inversiones (nombre, montoInvertido, rendimiento, fechaInicio, "
                   "fechaFin, tipo, idUsuario) values ('%s', %s, %s, %s, %s, '%s', %s);"
                   % (caption, value, performance, date_format, date_format1, investment_type, user_id))

    connection.commit()
    last_insert_id = cursor.lastrowid

    cursor.close()
    connection.close()

    response = jsonify(id=last_insert_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@investments_routes.route('/api/editInvestment', methods=['POST'])
def edit_investment():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    investment_id = data.get('id')
    investment_property = data.get('property')
    value = data.get('value')
    user_id = data.get('userId')
    if any_is_none(investment_id, investment_property, value, user_id):
        return jsonify(message="Missing parameter"), 400

    table_property = ""
    prop_format = "'%s'"
    if investment_property == "caption":
        table_property = "nombre"
    elif investment_property == "value":
        table_property = "montoInvertido"
        prop_format = "%s"
    elif investment_property == "performance":
        table_property = "rendimiento"
        prop_format = "%s"
    elif investment_property == "investmentDate":
        table_property = "fechaInicio"
    elif investment_property == "investmentTimeHorizon":
        table_property = "fechaFin"
    elif investment_property == "investmentType":
        table_property = "tipo"

    if "investmentDate" == investment_property or "investmentTimeHorizon" == investment_property:
        prop_format = "STR_TO_DATE('" + value + "', '%Y-%m-%d')"
    else:
        prop_format = prop_format % value

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("update inversiones set %s = %s where id = %s and idUsuario = %s;"
                   % (table_property, prop_format, investment_id, user_id))

    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@investments_routes.route('/api/deleteInvestment', methods=['POST'])
def delete_deb():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    investment_id = data.get('id')
    user_id = data.get('userId')
    if any_is_none(investment_id, user_id):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("delete from inversiones where id = %d and idUsuario = %d;" % (investment_id, user_id))
    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@investments_routes.route('/api/previewInvestments', methods=['POST'])
def get_preview_budgets():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select nombre from inversiones where idUsuario = %d;" % user_id)
    rows = cursor.fetchall()
    column_names = ["caption"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200
