import mysql.connector

db_config = {
    'user': 'root',
    'password': 'password',
    'host': '192.168.64.5',
    'database': 'finbalancpp'
}


def get_db_connection():
    return mysql.connector.connect(**db_config)
