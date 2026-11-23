require("donenv").nfig();
require("pg").Pool;
require("mysql2").createPool;

class database{
    #pool = null;
    #connection =null;
    isConnected = false;
    constructor(){
        this.#pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }) 
    }
    async conecta(){
        try{
            this.#connection = await this.#pool.getConnection();
            this.isConnected = true;
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }

    async desconecta(){
        try{
            await this.#connection.release();
            this.isConnected = false;
        }catch (error) {
            console.error("Error al desconectar de la base de datos:", error);
            throw error;
        }
    }
    async ejecutarConsulta(sql, parametros){
        try{
            const [rows] = await this.#connection.execute(sql, parametros);
            return rows;
        } catch (error) {
            console.error("Error al ejecutar consulta:", error);
            throw error;
        }
    }

    async probarConexion(){
        try{
            await this.#connection.ping();
            return true;
        } catch (error) {
            console.error("Error al probar la conexión a la base de datos:", error);
            return false;
        }

}

}


module.exports = database;
