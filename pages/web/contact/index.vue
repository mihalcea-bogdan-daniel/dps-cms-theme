<template>
  <NuxtLayout static>
    <template #featured-image>
      <h1 class="title">Contact</h1>
    </template>
    <!-- <template> -->
    <VForm
      :validationSchema="schema"
      class="col-span-12 grid grid-cols-12 gap-2"
      v-slot="{ values }"
    >
      <!-- <form class="container col-span-12">
          <input type="text" placeholder="Some placeholder" />
        </form> -->
      <div class="col-span-12 flex items-center justify-start w-full gap-4">
        <div class="flex gap-1 items-center">
          <VField name="category" type="radio" value="Tea" id="tea" />
          <label for="tea">Tea</label>
        </div>
        <div class="flex gap-1 items-center">
          <VField name="category" type="radio" value="Coffee" id="coffee" />
          <label for="coffee">Coffe</label>
        </div>
      </div>

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
      <!-- <select>
        <option value="type 1">Tipul 1</option>
        <option value="type 2">Tipul 2</option>
      </select> -->
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
        name="email"
        type="email"
        v-slot="{ field, errorMessage, meta }"
        as="div"
        class="flex flex-col col-span-12 sm:col-span-6"
      >
        <label for="email">E-mail</label>
        <input
          id="email"
          v-bind="field"
          :class="errorMessage ? 'cms-error' : ''"
          type="email"
          placeholder="Adresa de email"
        />
        <VErrorMessage class="cms-error" name="email"></VErrorMessage>
      </VField>
      <VField
        name="telephone"
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
        <label for="message">Numarul de telefon</label>
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

      <!-- <pre class="col-span-12">{{ schema }}</pre> -->
      <button>Trimite</button>
    </VForm>
    <!-- </template> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
import * as yup from "yup";
import "yup-phone";

const schema = yup.object({
  email: yup.string().required().email(),
  telephone: yup.string().min(10).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  message: yup.string().required(),
  category: yup.string(),
  requestType: yup.string().required(),
  acceptConditions: yup.boolean().required().isTrue(),
});
</script>

<style scoped></style>
