# Nuxt dps-cms-theme

## Foldere obligatorii

## `/static-assets`

Folder de stocare imagini statice.

## Sectiuni obligatorii

### `/homepage`

```yaml
homepage: cd:section
  hero-content: cd:section
  + formattedContent - folosit pentru continutul de langa galerie
  + title - folosit pentru titlul de langa galerie
    homepage-galerie: cd:gallery - galeria de imagini din homepage hero section
    mol-frontend: Fisier javascript de la aplicatia mol-frontend, App.umd.js(solutie temporara)
```

### `/sidebar`

### `/header`

```yaml
header: cd:section
  menu: cd:section
    + referintele sunt folosite ca linkuri pentru meniu
  contact: cd:section
    + formattedContent contine informatiile de contact din header, tel si email, formatat
```

### `/footer`

```yaml
footer: cd:section
  content: cd:section
    + formattedContent folosit pentru continutul footer-ului
  copyright: cd:section
    + formattedContent folosit pentru continutul copyright-ului
```
