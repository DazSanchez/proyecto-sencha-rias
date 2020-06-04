/**
 * @author hsanchez
 */

Ext.require(['Ext.plugin.Viewport']);

Ext.onReady(function () {
  Ext.define('App.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'price', type: 'number' },
      { name: 'url', type: 'string' },
    ],
  });

  Ext.define('App.store.Product', {
    extend: 'Ext.data.Store',
    storeId: 'productStore',
    model: 'App.model.Product',
    data: [{ title: 'Lorem', price: 10, url: 'url.com' }],
  });

  Ext.create('Ext.dataview.List', {
    renderTo: Ext.get('catalog-results'),
    itemTpl: '{title}',
    data: [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Item 3' },
      { title: 'Item 4' },
    ],
  });
});

// const { authenticate } = window.Helpers;

// const FILTER_KIND = {
//   TYPE: 1,
//   STYLE: 2,
// };

// const createItem = ({ url, title, price }) => {
//   return `
//     <div class="col-xs col-sm-6 col-lg-3 mb-3">
//         <div class="card">
//             <img class="card-img-top" src="${url}" alt="${title}">
//             <div class="card-body">
//             <h5 class="card-title">${title}</h5>
//             <p class="card-text">$${Number(price).toFixed(2)}</p>
//             <button class="btn button-primary btn-block">
//                 <i class="la la-cart-plus"></i>
//                 Agregar al carrito
//             </button>
//             </div>
//         </div>
//     </div>`;
// };

// const toggleLoading = () => {
//   const $loader = $('#loader');
//   const $catalog = $('#catalog-results');

//   $loader.toggleClass('d-none');
//   $catalog.toggleClass('d-none');

//   return () => {
//     $loader.toggleClass('d-none');
//     $catalog.toggleClass('d-none');
//   };
// };

// const renderResults = items => {
//   $('#catalog-results').html(
//     items ||
//       $(
//         '<h3 class="text-muted my-5 text-center">No hay resultados para esta b&uacute;squeda</h3>'
//       ).html()
//   );
// };

// const getCatalog = (filters, handler) => {
//   $.ajax('/api/controladores/catalogo_productos.php', {
//     data: filters,
//     dataType: 'json',
//     success: response => {
//       handler(response.map(createItem).join(' '));
//     },
//     error: () => {
//       alert('Ha ocurrido un error haciendo la petición.');
//     },
//   });
// };

// const searchHandler = filters => {
//   const loaded = toggleLoading();
//   getCatalog(filters, results => {
//     renderResults(results);
//     loaded();
//   });
// };

// const setupFormToggle = $form => {
//   const $filterToggle = $('#toggle-filters');

//   $filterToggle.click(() => {
//     $form.toggleClass('show');
//     $filterToggle.toggleClass('button-primary');
//   });
// };

// const setupFilterSelection = ({ $kind, $type, $style }) => {
//   $kind.change(() => {
//     $type.parent().toggleClass('d-none');
//     $style.parent().toggleClass('d-none');
//   });
// };

// const setupFilterTrigger = ({ $kind, $type, $style }) => {
//   $type.change(() => {
//     searchHandler({ filter: $kind.val(), q: $type.val() });
//   });

//   $style.change(() => {
//     searchHandler({ filter: $kind.val(), q: $style.val() });
//   });

//   $kind.change(() => {
//     const kind = $kind.val();
//     searchHandler({
//       filter: kind,
//       q: kind == FILTER_KIND.TYPE ? $type.val() : $style.val(),
//     });
//   });
// };

// const setupFilterForm = () => {
//   const $form = $('#filter-form');
//   const $kindFilter = $('#kind-filter');
//   const $typeFilter = $('#type-filter');
//   const $styleFilter = $('#style-filter');

//   const inputs = {
//     $kind: $kindFilter,
//     $style: $styleFilter,
//     $type: $typeFilter,
//   };

//   setupFormToggle($form);
//   setupFilterSelection(inputs);
//   setupFilterTrigger(inputs);

//   searchHandler({ filter: 1, q: 1 });
// };

$(document).ready(() => {
  $('#call-to-action').click(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: $('#catalog').offset().top,
    });
  });

  // setupFilterForm();
});
