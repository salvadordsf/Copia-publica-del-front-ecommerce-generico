# E-commerce Frontend

A full-featured e-commerce frontend built with Next.js 15, featuring a complete public storefront and a powerful admin panel for managing every aspect of the store.

📖 **Auto-generated docs:** https://deepwiki.com/salvadordsf/Copia-publica-del-front-ecommerce-generico  
🔗 **Backend repo:** private

---

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styles:** Tailwind CSS v4 + shadcn/ui
- **State:** Zustand + TanStack Query v5
- **Forms:** React Hook Form + Zod
- **Auth:** Better Auth
- **UI:** Swiper, Sonner, Lucide React, next-themes

---

## Admin Panel

The admin panel provides full control over the store's content, users, and orders. All resources support soft delete, archiving, and status filtering.

### Overview & Sidebar
![admin dashboard overview + Sidebar](Screenshots/ADMIN/Overview/admin%20dashboard%20overview.PNG)

### Categories
![categories overview](Screenshots/ADMIN/categories/categories%20overview.PNG)

**Single Category**
![category overview 1](Screenshots/ADMIN/categories/categorye%20overview%201.PNG)
![category overview 2](Screenshots/ADMIN/categories/categorye%20overview%202.PNG)

### Subcategories
![subcategories overview](Screenshots/ADMIN/subcategories/subcategory%20overview.PNG)

**Single Subcategory**
![subcategory overview 1](Screenshots/ADMIN/subcategories/subcategories%201.PNG)
![subcategory overview 2](Screenshots/ADMIN/subcategories/subcategories%202.PNG)

### Products
Full product management with status filtering (active, archived, deleted), tag manager, and image support.

**Resource status views**

![Product active](Screenshots/ADMIN/productos/Producto%20admin%20active.PNG)
![Product archived](Screenshots/ADMIN/productos/Producto%20admin%20archived.PNG)
![Product deleted](Screenshots/ADMIN/productos/Producto%20admin%20deleted.PNG)

**Create product**

![Create product](Screenshots/ADMIN/productos/CREATE/Crear%20producto.PNG)
![Create product 2](Screenshots/ADMIN/productos/CREATE/Crear%20producto%202.PNG)

**Search**

![search products](Screenshots/ADMIN/productos/SEARCH/search%20products%201.PNG)

**Actions — update**
![Update product 1](Screenshots/ADMIN/productos/ACTIONS/Update%20product%201.PNG)
![Update product 2](Screenshots/ADMIN/productos/ACTIONS/Update%20product%20step%202.PNG)
![Product tags manager](Screenshots/ADMIN/productos/CREATE/Producto%20admin%201%20gestor%20de%20etiquetas.PNG)

**Actions — archive**
![Archive product](Screenshots/ADMIN/productos/ACTIONS/Archive%20product.PNG)

**Actions — unarchive**
![Unarchive product](Screenshots/ADMIN/productos/ACTIONS/Unarchive%20product.PNG)

**Actions — delete**
![Delete product 1](Screenshots/ADMIN/productos/ACTIONS/Delete%20product%201.PNG)
![Delete product 2](Screenshots/ADMIN/productos/ACTIONS/Delete%20product%202.PNG)

**Actions — restore**
![Restore product 1](Screenshots/ADMIN/productos/ACTIONS/Revive%20product%201.PNG)
![Restore product 2](Screenshots/ADMIN/productos/ACTIONS/Revive%20product%202.PNG)

### Tags
Tags can be assigned to products to improve search and filtering.

![tags overview](Screenshots/ADMIN/tags/tags%20overview.PNG)

**Single Tag**
![tag overview](Screenshots/ADMIN/tags/tag%20overview.PNG)

### Bulk Actions
Bulk operations allow updating or deleting multiple resources at once, saving time when managing large catalogs.

**Categories bulk actions**
![categories bulk actions](Screenshots/ADMIN/bulk%20actions/categories/categories%20bulk%20actions%20overview.PNG)

**Subcategories bulk actions**
![subcategories bulk actions](Screenshots/ADMIN/bulk%20actions/subcategories/subcategories%20bulk%20actions%20overview.PNG)
![subcategories bulk actions update 1](Screenshots/ADMIN/bulk%20actions/subcategories/update%20subcategories%20bulk%20action%201.PNG)
![subcategories bulk actions delete](Screenshots/ADMIN/bulk%20actions/subcategories/update%20subcategories%20bulk%20action%202.PNG)

**Products bulk actions**
![products bulk actions](Screenshots/ADMIN/bulk%20actions/products/filtering%20products%20to%20bulk%20action.PNG)
![products bulk actions update 1](Screenshots/ADMIN/bulk%20actions/products/bulk%20update%201.PNG)
![products bulk actions update 2](Screenshots/ADMIN/bulk%20actions/products/bulk%20update%202.PNG)
![products bulk actions delete 1](Screenshots/ADMIN/bulk%20actions/products/bulk%20delete%201.PNG)
![products bulk actions delete 2](Screenshots/ADMIN/bulk%20actions/products/bulk%20delete%202.PNG)

**Tags bulk actions**
![tags bulk actions](Screenshots/ADMIN/bulk%20actions/tags/tags%20bulk%20actions%20overview.PNG)

### Home Builder
Visual editor to configure the public home page. Add, reorder and customize sections dynamically. Changes are reflected immediately on the public storefront.

**Available section types:** announcement carousel · image carousel · product carousel · category carousel · free text/link · item grid · custom

**Safe mode (non-editable preview)**
![home builder safe mode](Screenshots/ADMIN/sections%20manager/public%20store%20home%20page%20manager%20non%20editable%20overview.PNG)

**Editor mode (editable)**
![home builder editor mode](Screenshots/ADMIN/sections%20manager/public%20store%20home%20page%20manager%20editable%20overview.PNG)

**Adding a new section**

**Available section types:** announcement carousel · image carousel · product carousel · category carousel · free text/link · item grid · custom
![home builder adding section](Screenshots/ADMIN/sections%20manager/Create%20section.PNG)
![home section types](Screenshots/ADMIN/sections%20manager/Section%20types.PNG)

**Section types**

**Announcement Carousel**
![announcement carousel without items](Screenshots/ADMIN/sections%20manager/Sections%20types/Announcement/Announncement%20carousel%20overview%20without%20items.PNG)
![announcement carousel adding item](Screenshots/ADMIN/sections%20manager/Sections%20types/Announcement/Announncement%20carousel%20adding%20item.PNG)
![announcement carousel with items](Screenshots/ADMIN/sections%20manager/Sections%20types/Announcement/Announncement%20carousel%20overview%20with%20items.PNG)

**Banners Carousel**
![banner carousel adding item](Screenshots/ADMIN/sections%20manager/Sections%20types/Banner/Banner%20adding%20image%20item.PNG)
![banner carousel with items](Screenshots/ADMIN/sections%20manager/Sections%20types/Banner/Banner%20section%20overview.PNG)

**Categories Carousel**
![categories carousel adding item](Screenshots/ADMIN/sections%20manager/Sections%20types/Category/Category%20section%20adding%20items%20to%20the%20carousel.PNG)
![categories carousel with items](Screenshots/ADMIN/sections%20manager/Sections%20types/Category/Category%20section%20overview.PNG)

**Products Carousel**
![products carousel adding item](Screenshots/ADMIN/sections%20manager/Sections%20types/Product/Product%20section%20adding%20items%20to%20the%20carousel.PNG)
![products carousel with items](Screenshots/ADMIN/sections%20manager/Sections%20types/Product/Product%20section%20overview.PNG)

**Text**
![text adding item](Screenshots/ADMIN/sections%20manager/Sections%20types/Text/Text%20section%20adding%20items.PNG)
![text with items](Screenshots/ADMIN/sections%20manager/Sections%20types/Text/Text%20section%20overview.PNG)

**Grid**
![grid selecting item type](Screenshots/ADMIN/sections%20manager/Sections%20types/Grid/Grid%20section%20selecting%20the%20item%20type%20for%20add.PNG)
![grid adding item](Screenshots/ADMIN/sections%20manager/Sections%20types/Text/Text%20section%20adding%20items.PNG)

### Users Management
Full user management with role assignment and soft delete support.

![users overview](Screenshots/ADMIN/users/Users%20overview.PNG)

**Single User**
![user overview active](Screenshots/ADMIN/users/user%20admin%20overview.PNG)
![user overview deleted](Screenshots/ADMIN/users/deleted%20user%20overview.PNG)

**Update User**
![user update role](Screenshots/ADMIN/users/update%20role.PNG)
![user update role confirmation](Screenshots/ADMIN/users/update%20role%20alert.PNG)

### Orders Management
![orders overview](Screenshots/ADMIN/Orders/orders%20overview.PNG)

**Single Order**
![order overview](Screenshots/ADMIN/Orders/order%20overview.PNG)

---

## Public Storefront

### Home
Dynamic home page built from configurable sections managed via the admin panel (carousels, banners, product highlights, categories, text, links and more).

**Admin section configuration**
![admin section state 1](Screenshots/PUBLIC/Home/estado%20del%20home%20desde%20el%20admin%201.PNG)
![admin section state 2](Screenshots/PUBLIC/Home/estado%20del%20home%20desde%20el%20admin%202.PNG)

**Resulting public home**
![public home 1](Screenshots/PUBLIC/Home/home%201.PNG)
![public home 2](Screenshots/PUBLIC/Home/home%202.PNG)
![public home 3](Screenshots/PUBLIC/Home/home%203.PNG)
![public home 4](Screenshots/PUBLIC/Home/home%204.PNG)

### Sidebar
The sidebar is the main navigation element, adapting its content based on the user's authentication state.

**Without login**
![sidebar without login](Screenshots/PUBLIC/Sidebar/public%20sidebar%20without%20login.PNG)

**With login**
![sidebar logged](Screenshots/PUBLIC/Sidebar/public%20sidebar.PNG)

**User menu**
![sidebar user menu](Screenshots/PUBLIC/Sidebar/public%20sidebar%20user%20menu.PNG)

### Products
Full product catalog with filters by category, subcategory, and price range. Includes fuzzy search with autocomplete.

![all products](Screenshots/PUBLIC/Products/All%20products/listado%20de%20todos%20los%20productos.PNG)

**Single Product**
![product detail 1](Screenshots/PUBLIC/Products/product%20page%201.PNG)
![product detail 2](Screenshots/PUBLIC/Products/product%20page%202.PNG)

### Search
Fuzzy search with autocomplete, supporting matches by name, tags, category and subcategory.

![searcher](Screenshots/PUBLIC/Products/All%20products/buscador%20en%20funcionamiento%20por%20tags%20y%20coincidencia.PNG)

### Categories
![all categories](Screenshots/PUBLIC/Categories/categories%20page.PNG)

**Single Category**
![category detail](Screenshots/PUBLIC/Categories/category%20page.PNG)

### Subcategories
![subcategory detail](Screenshots/PUBLIC/Subcategories/Subcategory%20page.PNG)

### Cart
Three-step cart flow: review items, enter shipping details, confirm order.

![cart step 1](Screenshots/PUBLIC/Cart/Cart%20page%20step%201.PNG)
![cart step 2](Screenshots/PUBLIC/Cart/Cart%20page%20step%202.PNG)
![cart step 3](Screenshots/PUBLIC/Cart/Cart%20page%20step%203.PNG)

### Checkout & Orders
![checkout and order 1](Screenshots/PUBLIC/Orders/order%20page%201.PNG)
![checkout and order 2](Screenshots/PUBLIC/Orders/order%20page%202.PNG)

### Profile with Orders
Users can view and track all their past orders from their profile page.

![profile with orders](Screenshots/PUBLIC/Profile/Profile%20with%20order.PNG)

### Generic Pages
Two fully configurable generic pages available for custom content such as landing pages, promotions or editorial content.

**Generic Page 1**
![generic section 1-1](Screenshots/PUBLIC/generic%20sections/generic%20page%201/generic%20section-1%201.PNG)
![generic section 1-2](Screenshots/PUBLIC/generic%20sections/generic%20page%201/generic%20section-1%202.PNG)

**Generic Page 2**
![generic section 2-1](Screenshots/PUBLIC/generic%20sections/generic%20page%202/generic%20section-2%201.PNG)
![generic section 2-2](Screenshots/PUBLIC/generic%20sections/generic%20page%202/generic%20section-2%202.PNG)

### FAQ
![FAQ page 1](Screenshots/PUBLIC/faq/faq%20page%201.PNG)
![FAQ page 2](Screenshots/PUBLIC/faq/faq%20page%202.PNG)

### Contact
![Contact page](Screenshots/PUBLIC/Contact/contact%20page.PNG)

---

## Auth — Login & Register

**Login**
![auth login](Screenshots/AUTH/Login.PNG)

**Register**
![auth register](Screenshots/AUTH/signin.PNG)

---

## Upcoming Integrations

The following features are currently in progress or planned for future releases:

- **Payment gateway (MercadoPago):** full delegation of order status and lifecycle to webhook events from the payment provider
- **Transactional email (Resend):** automated emails for order confirmation, status updates, and account notifications
- **Shipping integration:** connection with a shipping provider to handle logistics, tracking and delivery status
- **Provider Auth — Google (adding with BetterAuth):** sign in with Google as an additional authentication option

---

## Author

**Salvador** — [GitHub](https://github.com/salvadordsf)
