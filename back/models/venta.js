'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let VentaSchema = Schema({
    cliente: {type: Schema.ObjectId,ref:'cliente', required:true},
    nventa: {type: String, require: true},
    subtotal:{type: Number,require: true},
    envio_titulo:{type: String,require: true},
    envio_precio:{type: Number,require: true},
    transaccion:{type: String,require: true},
    cupon:{type: String,require: true},
    estado:{type: String,require: true},
    direccion:{type: Schema.ObjectId,ref:'direccion',required:true},
    nota: {type: String, require:true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('venta',VentaSchema);