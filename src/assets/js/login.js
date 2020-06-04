Ext.require(['Ext.plugin.Viewport']);

Ext.onReady(function () {
  Ext.create('Ext.form.Panel', {
    renderTo: Ext.get('login-form'),
    title: 'Ingreso',
    bodyPadding: 10,
    width: '100%',
    standardSubmit: false,
    url: '/api/controladores/iniciar_sesion.php',
    jsonSubmit: true,
    defaultType: 'textfield',
    defaults: {
      allowBlank: false,
      blankText: '*Campo requerido',
    },
    items: [
      {
        fieldLabel: 'Usuario',
        name: 'username',
      },
      {
        fieldLabel: 'Contrase\u00F1a',
        inputType: 'password',
        name: 'pwd',
      },
    ],
    buttons: [
      {
        text: 'Ingresar',
        handler: function () {
          const form = this.up('form').getForm();
          if (!form.isValid()) return;

          form.submit({
            success: function (_form, { result: { data } }) {
              localStorage.setItem('user', JSON.stringify(data));
              location.href = '/';
            },
            failure: function (_form, action) {
              switch (action.failureType) {
                case Ext.form.action.Action.CONNECT_FAILURE:
                  const response = JSON.parse(action.response.responseText);
                  Ext.Msg.alert('Error en la petici\u00F3n', response.mensaje);
                  break;
                default:
                  Ext.Msg.alert('Error', 'Ha ocurrido un error');
                  break;
              }
            },
          });
        },
      },
    ],
  });
});
