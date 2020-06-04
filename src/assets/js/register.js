Ext.require(['Ext.plugin.Viewport']);

Ext.onReady(function () {
  Ext.create('Ext.form.Panel', {
    renderTo: Ext.get('register-form'),
    title: 'Registro de cliente',
    bodyPadding: 10,
    width: '100%',
    standardSubmit: false,
    jsonSubmit: true,
    defaults: {
      allowBlank: false,
      blankText: '*Campo requerido',
    },
    items: [
      {
        html: '<h5 class="h5">Tienda Especializada</h5>',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'RFC',
        name: 'rfc',
        regex: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        regexText: 'No es un formato de RFC v\u00E1lido',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Nombre de tienda especializada',
        name: 'nombreTienda',
      },
      {
        html: '<h5 class="h5">Datos del Usuario</h5>',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Nombre',
        name: 'nombre',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Apellido paterno',
        name: 'apaterno',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Apellido materno',
        name: 'amaterno',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Dirección',
        name: 'direccion',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Teléfono de oficina',
        name: 'telOficina',
        regex: /\d{10}/,
        regexText: 'Debe contener 10 dígitos',
        maxLength: 10,
        maxLengthText: 'Debe contener 10 dígitos',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Teléfono celular',
        name: 'telCelular',
        regex: /\d{10}/,
        regexText: 'Debe contener 10 dígitos',
        maxLength: 10,
        maxLengthText: 'Debe contener 10 dígitos',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Correo electrónico',
        vtype: 'email',
        emailText: 'No es una dirección de correo v\u00E1lida',
        name: 'correo',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Nombre de usuario',
        name: 'nombreUsuario',
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Contraseña',
        name: 'claveAcceso',
      },
    ],
    buttons: [
      {
        text: 'Registrarse',
        handler: function () {},
      },
    ],
  });
});
