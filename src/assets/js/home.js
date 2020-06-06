/**
 * @author hsanchez
 */

Ext.require(["Ext.plugin.Viewport"]);
Ext.namespace("Ext.datos");

var arrDatos = Ext.create("Ext.data.Store", {
  fields: ['cve', 'name'],
  data: [
    { cve: 1, name: "Tipo" },
    { cve: 2, name: "Estilo" },
  ]
});

var arrDatosType=Ext.create("Ext.data.Store", {
  fields: ['cve', 'name'],
  data: [
    { cve: 1, name: "Sillones" },
    { cve: 2, name: "Mesas" },
    { cve: 3, name: "Sillas" },
    { cve: 4, name: "Taburetes" },
    { cve: 5, name: "Escritorios" },
  ]
});

Ext.define("Producto", {
  extend: "Ext.data.Model",
  fields: [{ name: "title" }, { name: "price" }, { name: "url" }],
});

var storeProduct = Ext.create("Ext.data.Store", {
  name:'storeProduct',
  extend: "Ext.data.Store",
  storeId: "ProductStore",
  model: "Producto",
  autoLoad: true, //se carga al definirse
  autoSync: false, //se usa cuando tiene elementos asociados de otros modelos.
  proxy: {
    type: "ajax",
    pageParam: false, //to remove param "page"
    startParam: false, //to remove param "start"
    limitParam: false, //to remove param "limit"
    noCache: false, // to remove _dc
    url: "/api/controladores/catalogo_productos.php?filter=1&q=1",
    reader: {
      type: "json",
      rootProperty: "data", //elemento del json que corresponde a un arreglo
    },
  },
});

Ext.onReady(function () {

  //Define tabla
  const table = Ext.create("Ext.form.Panel", {
    title: "Catalogo de productos",
    renderTo: Ext.get("catalog-results"),
    bodyPadding: 5,
    width: "100vw",
    items: [
      {
        xtype: "grid",
        store: storeProduct,
        width: "100%",
        columns: [
          {
            text: "Titulo",
            width: 250,
            dataIndex: "title",
          },
          {
            text: "Precio",
            width: 100,
            dataIndex: "price",
          },
          {
            text: "Producto",
            dataIndex: "url",
            renderer: function (value, metadata, record) {
              return (
                '<img src= "' +
                value +
                '" style="width:150px;height:150px" >' +
                "<br> <br>" +
                '<button class="btn button-primary btn-block">' +
                '<i class="la la-cart-plus"></i>' +
                "Agregar al carrito" +
                "</button>"
              );
            },
            width: 250,
          },
        ],
      },
    ],
  });

  Ext.create("Ext.form.Panel", {
    renderTo: Ext.get("filter-form"),
    bodyPadding: 10,
    width: "80%",
    class:"content-filters",
    defaultType: "textfield",
    method:'GET',
    defaults: {
      allowBlank: false,
    },
    items: [
      {
        xtype: "combobox",
        displayField: "name",
        valueField: "cve",
        name: "filter",
        id:"typecbx",
        store: arrDatos,
        editable:false,
        listeners: {
          change: function (field, newValue, oldValue) {
            if(newValue ==1){
              var combo2 = Ext.getCmp('typecbxs');
              combo2.select(combo2.getStore().getAt(0));              
            }else{
              arrDatosType = Ext.create("Ext.data.Store", {
                fields: ['cve', 'name'],
                data: [
                  { cve: 1, name: "Reproducciones" },
                  { cve: 2, name: "Contemporaneos" },
                  { cve: 3, name: "Coloniales" },
                  { cve: 4, name: "Art Noveu" },
                ]
              });
              var combo2 = Ext.getCmp('typecbxs');
              combo2.setStore(arrDatosType);
              combo2.select(combo2.getStore().getAt(0));
              combo2.setStore(arrDatosType);             
            }
          },
          scope: this
      }
      },
      {
        xtype: "combobox",
        displayField: "name",
        valueField: "cve",
        name: "q",
        id:"typecbxs",
        store: arrDatosType,
      },
    ],
    buttons: [
      {
        text: "Filtrar",
        
        handler: function () {          
          const form = this.up("form").getForm();
          if (!form.isValid()) return;
          const url = "/api/controladores/catalogo_productos.php";
          const params = "?filter="+form.getValues().filter+"&q="+form.getValues().q;
          
          form.submit({
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"
            noCache: false, // to remove _dc
            url: url+params,          
          });

          var newStore = Ext.create("Ext.data.Store", {
            extend: "Ext.data.Store",
            storeId: "ProductStore",
            model: "Producto",
            autoLoad: true,
            autoSync: false, 
            proxy: {
              type: "ajax",
              pageParam: false, //to remove param "page"
              startParam: false, //to remove param "start"
              limitParam: false, //to remove param "limit"
              noCache: false, // to remove _dc
              url: url+params,
              reader: {
                type: "json",
                rootProperty: "data",
              },
            },
          });
          table.down('grid').setStore(newStore)
        },
      },
    ],
  });

  var combo = Ext.getCmp('typecbx');
  combo.select(combo.getStore().getAt(0));


  var user = localStorage.getItem('user');

  const objectUser = JSON.parse(user);

  console.log();
  

  if(objectUser.userRole == 'ADMIN'){
    $(document).ready(() => {
      $("#username-display").removeClass("d-none");
      $("#username").text(objectUser.username);
      $("#admin-add").removeClass("d-none");
      $("#logout-btn").removeClass("d-none");
      $("#access-links").toggleClass("d-none");

    });  
  }
  else if(objectUser.userRole == 'CLIENTE'){
    $(document).ready(() => {
      $("#username-display").removeClass("d-none");
      $("#username").text(objectUser.username);
      $("#admin-add").toggleClass("d-none");
      $("#logout-btn").removeClass("d-none");
      $("#access-links").toggleClass("d-none");
    });  
  }

});

const FILTER_KIND = {
  TYPE: 1,
  STYLE: 2,
};

const searchHandler = (filters) => {
  // getCatalog(filters, (results) => {
  //   renderResults(results);
  // });
};

const setupFormToggle = ($form) => {
  const $filterToggle = $("#toggle-filters");
  

  $filterToggle.click(() => {
    $form.toggleClass("show");
    $filterToggle.toggleClass("button-primary");
  });
};

const setupFilterSelection = ({ $kind, $type, $style }) => {
  $kind.change(() => {
    $type.parent().toggleClass("d-none");
    $style.parent().toggleClass("d-none");
  });
};

const setupFilterTrigger = ({ $kind, $type, $style }) => {
  $type.change(() => {
    searchHandler({ filter: $kind.val(), q: $type.val() });
  });

  $style.change(() => {
    searchHandler({ filter: $kind.val(), q: $style.val() });
  });

  $kind.change(() => {
    const kind = $kind.val();
    searchHandler({
      filter: kind,
      q: kind == FILTER_KIND.TYPE ? $type.val() : $style.val(),
    });
  });
};

const setupFilterForm = () => {
  const $form = $("#filter-form");
  const $kindFilter = $("#kind-filter");
  const $typeFilter = $("#type-filter");
  const $styleFilter = $("#style-filter");

  const inputs = {
    $kind: $kindFilter,
    $style: $styleFilter,
    $type: $typeFilter,
  };

  setupFormToggle($form);
  setupFilterSelection(inputs);
  setupFilterTrigger(inputs);

  searchHandler({ filter: 1, q: 1 });
};

$(document).ready(() => {
  $("#call-to-action").click(() => {
    window.scrollTo({
      behavior: "smooth",
      top: $("#catalog").offset().top,
    });
  });



  const $btn =  $("#admin-add");
  $btn.removeClass("d-none");
  setupFilterForm();
});