"use strict";
var KTCreateAccount = (function () {
  var e,
    t,
    i,
    o,
    s,
    r,
    a = [];
  return {
    init: function () {
      (e = document.querySelector("#kt_modal_create_account")) &&
        new bootstrap.Modal(e),
        (t = document.querySelector("#kt_create_account_stepper")),
        (i = t.querySelector("#kt_create_account_form")),
        (o = t.querySelector('[data-kt-stepper-action="submit"]')),
        (s = t.querySelector('[data-kt-stepper-action="next"]')),
        (r = new KTStepper(t)).on("kt.stepper.changed", function (e) {
          4 === r.getCurrentStepIndex()
            ? (o.classList.remove("d-none"),
              o.classList.add("d-inline-block"),
              s.classList.add("d-none"))
            : 5 === r.getCurrentStepIndex()
            ? (o.classList.add("d-none"), s.classList.add("d-none"))
            : (o.classList.remove("d-inline-block"),
              o.classList.remove("d-none"),
              s.classList.remove("d-none"));
        }),
        r.on("kt.stepper.next", function (e) {
          console.log("stepper.next");
          var t = a[e.getCurrentStepIndex() - 1];
          t
            ? t.validate().then(function (t) {
                console.log("validated!"),
                  "Valid" == t
                    ? (e.goNext(), KTUtil.scrollTop())
                    : Swal.fire({
                        text: "Silahkan lengkapi data dengan sesuai",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Oke",
                        customClass: { confirmButton: "btn btn-light" },
                      }).then(function () {
                        KTUtil.scrollTop();
                      });
              })
            : (e.goNext(), KTUtil.scrollTop());
        }),
        r.on("kt.stepper.previous", function (e) {
          console.log("stepper.previous"), e.goPrevious(), KTUtil.scrollTop();
        }),
        a.push(
          FormValidation.formValidation(i, {
            fields: {
              npsn: {
                validators: {
                  notEmpty: { message: "NPSN Harus diisi" },
                },
              },
            },
            plugins: {
              trigger: new FormValidation.plugins.Trigger(),
              bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: "",
              }),
            },
          })
        ),
        a.push(
          FormValidation.formValidation(i, {
            fields: {
              nama_sekolah: {
                validators: {
                  notEmpty: {
                    message: "Nama sekolah tidak boleh kosong",
                  },
                },
              },
              email_sekolah: {
                validators: {
                  notEmpty: { message: "Surel (Email) tidak boleh kosong" },
                  emailAddress: {
                    message: "Surel (Email) tidak valid",
                  },
                },
              },
              telp_sekolah: {
                validators: {
                  notEmpty: { message: "Nomor telepon tidak boleh kosong" },
                },
              },
              kode_pos_sekolah: {
                validators: {
                  notEmpty: { message: "Kode pos tidak boleh kosong" },
                },
              },
            },
            plugins: {
              trigger: new FormValidation.plugins.Trigger(),
              bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: "",
              }),
            },
          })
        ),
        a.push(
          FormValidation.formValidation(i, {
            fields: {
              nama_pj: {
                validators: {
                  notEmpty: { message: "Nama tidak boleh kosong" },
                },
              },
              nik_pj: {
                validators: {
                  notEmpty: { message: "NIK tidak boleh kosong" },
                },
              },
              no_telpon_pj: {
                validators: {
                  notEmpty: { message: "Nomor telepon tidak boleh kosong" },
                },
              },
            },
            plugins: {
              trigger: new FormValidation.plugins.Trigger(),
              bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: "",
              }),
            },
          })
        ),
        a.push(
          FormValidation.formValidation(i, {
            fields: {
              email_akun: {
                validators: {
                  notEmpty: { message: "Email tidak boleh kosong" },
                  emailAddress: {
                    message: "Surel (Email) tidak valid",
                  },
                },
              },
              password_akun: {
                validators: {
                  notEmpty: { message: "Kata sandi tidak boleh kosong" },
                },
              },
              ulangi_password_akun: {
                validators: {
                  notEmpty: { message: "Kata sandi tidak boleh kosong" },
                },
              },
            },
            plugins: {
              trigger: new FormValidation.plugins.Trigger(),
              bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: "",
              }),
            },
          })
        ),
        o.addEventListener("click", function (e) {
          a[3].validate().then(function (t) {
            console.log("validated!"),
              "Valid" == t
                ? (e.preventDefault(),
                  (o.disabled = !0),
                  o.setAttribute("data-kt-indicator", "on"),
                  setTimeout(function () {
                    o.removeAttribute("data-kt-indicator"),
                      (o.disabled = !1),
                      r.goNext();
                  }, 2e3))
                : Swal.fire({
                    text: "Silahkan lengkapi data dengan sesuai",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Oke",
                    customClass: { confirmButton: "btn btn-light" },
                  }).then(function () {
                    KTUtil.scrollTop();
                  });
          });
        }),
        $(i.querySelector('[name="card_expiry_month"]')).on(
          "change",
          function () {
            a[3].revalidateField("card_expiry_month");
          }
        ),
        $(i.querySelector('[name="card_expiry_year"]')).on(
          "change",
          function () {
            a[3].revalidateField("card_expiry_year");
          }
        ),
        $(i.querySelector('[name="business_type"]')).on("change", function () {
          a[2].revalidateField("business_type");
        });
    },
  };
})();
KTUtil.onDOMContentLoaded(function () {
  KTCreateAccount.init();
});
