<template>
  <NuxtLayout static>
    <template #featured-image>
      <h1 class="title">Contact</h1>
    </template>
    <h2 class="title">Contact rapid</h2>
    <VForm
      :validationSchema="schema"
      class="col-span-12 grid grid-cols-12 gap-2"
      v-slot="{ values }"
      @submit="handleFormSubmit"
    >
      <!-- categorie radio -->
      <div class="col-span-12">
        <div class="flex items-center justify-start w-full gap-4">
          <div class="flex gap-1 items-center">
            <VField name="category" type="radio" value="Tea" id="tea" />
            <label for="tea">Tea</label>
          </div>
          <div class="flex gap-1 items-center">
            <VField name="category" type="radio" value="Coffee" id="coffee" />
            <label for="coffee">Coffe</label>
          </div>
        </div>
        <VErrorMessage class="cms-error" name="requestType"></VErrorMessage>
      </div>
      <!-- end categorie radio -->
      <!-- request type dropdown -->
      <VField
        name="requestType"
        as="div"
        class="col-span-12 flex flex-col"
        v-slot="{ field, errorMessage }"
      >
        <label for="requestType">Tipul cererii</label>
        <UiSelect
          class="w-full"
          v-bind="field"
          name="requestType"
          :class="errorMessage ? 'cms-error' : ''"
        />
        <VErrorMessage class="cms-error" name="requestType"></VErrorMessage>
      </VField>
      <!-- end request type dropdown -->
      <VField
        name="firstName"
        type="firstName"
        v-slot="{ field, errorMessage, meta }"
        as="div"
        class="flex flex-col col-span-12 sm:col-span-6"
      >
        <label for="firstName">Nume</label>
        <input
          id="firstName"
          v-bind="field"
          :class="errorMessage ? 'cms-error' : ''"
          type="text"
          placeholder="Numele"
        />
        <VErrorMessage class="cms-error" name="firstName"></VErrorMessage>
      </VField>
      <VField
        name="lastName"
        type="lastName"
        v-slot="{ field, errorMessage, meta }"
        as="div"
        class="flex flex-col col-span-12 sm:col-span-6"
      >
        <label for="lastName">Prenume</label>
        <input
          id="lastName"
          v-bind="field"
          :class="errorMessage ? 'cms-error' : ''"
          type="text"
          placeholder="Prenumele"
        />
        <VErrorMessage class="cms-error" name="lastName"></VErrorMessage>
      </VField>
      <VField
        name="eMail"
        type="eMail"
        v-slot="{ field, errorMessage, meta }"
        as="div"
        class="flex flex-col col-span-12 sm:col-span-6"
      >
        <label for="eMail">E-mail</label>
        <input
          id="eMail"
          v-bind="field"
          :class="errorMessage ? 'cms-error' : ''"
          type="eMail"
          placeholder="Adresa de eMail"
        />
        <VErrorMessage class="cms-error" name="eMail"></VErrorMessage>
      </VField>
      <VField
        name="phone"
        type="phone"
        v-slot="{ field, errorMessage, meta }"
        as="div"
        class="flex flex-col col-span-12 sm:col-span-6"
      >
        <label for="phone">Numarul de telefon</label>
        <input
          id="phone"
          v-bind="field"
          :class="errorMessage ? 'cms-error' : ''"
          type="phone"
          placeholder="Numarul de telefon"
        />
        <VErrorMessage class="cms-error" name="phone"></VErrorMessage>
      </VField>
      <VField
        name="message"
        type="text"
        v-slot="{ field, errorMessage, meta }"
        as="div"
        class="flex flex-col col-span-12"
      >
        <label for="message">Mesajul transmis</label>
        <textarea
          id="message"
          v-bind="field"
          :class="errorMessage ? 'cms-error' : ''"
          placeholder="Introduceti mesajul"
          rows="7"
        />
        <VErrorMessage class="cms-error" name="message"></VErrorMessage>
      </VField>
      <div class="col-span-12">
        <VField
          name="acceptConditions"
          v-slot="{ field, errorMessage }"
          as="div"
          class="col-span-12 flex items-center gap-1"
          uncheckedValue="false"
          value="true"
          type="checkbox"
        >
          <input
            type="checkbox"
            value="true"
            v-bind="field"
            id="acceptConditions"
            :class="errorMessage ? 'cms-error' : ''"
          />
          <label for="acceptConditions">Accept conditions</label>
        </VField>
        <VErrorMessage
          class="cms-error"
          name="acceptConditions"
        ></VErrorMessage>
      </div>
      <button class="cms-btn" type="submit">Trimite</button>
    </VForm>
    <template #sidebar>
    <div class="flex flex-col gap-6">
      <div>
        <h2 class="title small mb-3">Program audiențe</h2>
        <h4 class="small">Primar: Luni 9 <sup>00</sup> - 11 <sup>00</sup></h4>
        <h4 class="small">
          Viceprimar: Marți 9 <sup>00</sup> - 11 <sup>00</sup>
        </h4>
        <h4 class="small">
          Secretar: Miercuri 9 <sup>00</sup> - 11 <sup>00</sup>
        </h4>
      </div>
      <div>
        <h2 class="title small mb-3">Program de lucru</h2>
        <h4 class="small">Luni - Vineri 8<sup>00</sup> - 16 <sup>00</sup></h4>
      </div>
      <div>
        <h2 class="title small mb-3">Date contact</h2>
        <a href="tel: +40249 481 006">
          <h4 class="small cms-link">Tel./Fax: 0249 481 006</h4>
        </a>
        <a type="email" href="mailto:contact@primaria-corbu.ro">
          <h4 class="small cms-link">E-mail: contact@primaria-corbu.ro</h4>
        </a>
      </div>
    </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ToastServiceMethods } from "primevue/toastservice";

import * as yup from "yup";
const config = useRuntimeConfig();
const nuxtApp = useNuxtApp();

const toast: ToastServiceMethods | undefined =
  nuxtApp.vueApp.config.globalProperties.$toast;

interface Data {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  requestType: string;
  category: string;
  acceptConditions: string;
}
const handleFormSubmit = (e: Data) => {
  const { acceptConditions, ...rest } = e;
  if (acceptConditions == "true") {
    useFetch(`/api/v1/web/contact-form`, {
      baseURL: config.public.apiBase,
      method: "POST",
      body: { ...rest },
    })
      .then(({ error }) => {
        if (error.value) {
          throw new Error("A aparut o eroare la transmiterea mesajului");
        } else {
          toast?.add({
            severity: "success",
            summary: "Mesajul a fost transmis cu succes",
            life: 10000,
          });
        }
      })
      .catch((err) => {
        if (toast) {
          toast.add({
            severity: "error",
            summary: "A aparut o eroare",
            detail: "Nu s-a putut transmite continutul mesajului",
            life: 10000,
          });
        }
      });
  }
};

const schema = yup.object({
  eMail: yup.string().required().email(),
  phone: yup.string().min(10).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  message: yup.string().required(),
  category: yup.string().required(),
  requestType: yup.string().required(),
  acceptConditions: yup.boolean().required().isTrue(),
});
</script>

<style scoped></style>
