'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required:true},
    galeria: [{type: Object, required: false}],
    portada: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    contenido: {type: String, required: true},
    stock: {type: Number, required: true},
    nVentas: {type: Number, default:0, required: true},
    nPuntos: {type: Number, default:0, required: true},
    variedades: [{type: Object, require: false}],
    categoria: {type: String, required:true},
    titulo_variedad: {type: String, required:false},
    estado: {type: String, default:'Edicion', required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('producto',ProductoSchema);