const { logout, getUser } = window.Helpers;

const fillOptions = ({ tipos, materiales, estilos }) => {
  const $tipos = $("#tipo");
  tipos.forEach($tipo => {
    $tipo.appendTo($tipos);
  });

  const $materiales = $("#material");
  materiales.forEach($material => {
    $material.appendTo($materiales);
  });

  const $estilos = $("#estilo");
  estilos.forEach($estilo => {
    $estilo.appendTo($estilos);
  });
};

const convertirOptiones = opts => {
  return opts.map(opt => $(`<option value="${opt.id}">${opt.nombre}</option>`));
};

const setupOpciones = () => {
  $.ajax("/api/controladores/obtener_opciones_mueble.php", {
    dataType: "json",
    success: res => {
      fillOptions({
        tipos: convertirOptiones(res.tipos),
        materiales: convertirOptiones(res.materiales),
        estilos: convertirOptiones(res.estilos)
      });
    },
    error: () => {
      alert("Ocurrio un error en la peticion");
    }
  });
};

const uploadImage = (img, handler, error) => {
  const formData = new FormData();
  formData.set("imagen", img);
  $.ajax("/api/controladores/subir_imagen.php", {
    method: "post",
    contentType: false,
    processData: false,
    data: formData,
    success: handler,
    error
  });
};

const createProduct = (product, handler, error) => {
  $.ajax("/api/controladores/crear_producto.php", {
    method: "post",
    contentType: "application/json",
    data: JSON.stringify(product),
    success: handler,
    error
  });
};

const errorHandler = () => {
  alert("Ha ocurrido un error creando el producto");
};

const setupForm = () => {
  const $form = $("#product-form");
  $form.on("submit", function(e) {
    e.preventDefault();

    const imagen = $("#imagen").prop("files")[0];
    uploadImage(
      imagen,
      ({ filename }) => {
        const product = {
          modelo: $("#model").val(),
          precio: $("#precio").val(),
          cantidad: $("#existencia").val(),
          descripcion: $("#description").val(),
          imagen: filename,
          alto: $("#alto").val(),
          ancho: $("#ancho").val(),
          largo: $("#largo").val(),
          peso: $("#peso").val(),
          tipo: $("#tipo").val(),
          estilo: $("#estilo").val(),
          material: $("#material").val()
        };

        createProduct(
          product,
          () => {
            $form.trigger("reset");
            alert("Se ha creado el producto");
          },
          errorHandler
        );
      },
      errorHandler
    );
  });
};

$(document).ready(() => {
  const user = getUser();

  if (!user || user.userRole != "ADMIN") {
    location.href = "/";
  }

  setupOpciones();
  setupForm();
});
