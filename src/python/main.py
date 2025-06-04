from flask import Flask, request, jsonify
from budgets import budgets_routes
from db_conf import get_db_connection
from debit_n_debt import deb_routes
from earnings import earnings_routes
from cards import card_routes
from investments import investments_routes
from users import user_routes
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(card_routes)
app.register_blueprint(user_routes)
app.register_blueprint(earnings_routes)
app.register_blueprint(budgets_routes)
app.register_blueprint(investments_routes)
app.register_blueprint(deb_routes)
# CORS(app, allow_headers=['Content-Type'], origins=['http://localhost:3000'])
CORS(app, resources={"/api/*": {"origins": "*"}}, allow_headers=['Content-Type'], origins=['http://localhost:3000/*'])


@app.route('/api/tips', methods=['GET'])
def get_tips():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select nombre, contenido, imagen from educacionfinanciera;")
    rows = cursor.fetchall()
    column_names = ["title", "content", "image"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@app.route('/api/previewTips', methods=['GET'])
def get_small_tips():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select nombre from educacionfinanciera;")
    rows = cursor.fetchall()
    column_names = ["caption"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


if __name__ == '__main__':
    app.run(debug=True)
