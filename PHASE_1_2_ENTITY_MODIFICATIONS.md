# Phase 1.2 - Entity Modifications for Multi-tenant

## ✅ Modifications Complétées (12 entities)

### Entities modifiées avec `tenant_id` + `TenantAware`

1. ✅ `User.java` - atelier_user
2. ✅ `Client.java` - client
3. ✅ `Supplier.java` - supplier
4. ✅ `Diamond.java` - diamond
5. ✅ `AtelierFile.java` - atelier_file
6. ✅ `Gemstone.java` - gemstone
7. ✅ `OrderTask.java` - order_task
8. ✅ `PriceSetting.java` - price_setting
9. ✅ `Order.java` - atelier_order
10. ✅ `Cylinder.java` - cylinder
11. ✅ `Segment.java` - segment

## ⚠️ Modifications Restantes (38 entities)

### À modifier selon le même pattern :

**Pattern de modification :**
```java
// AVANT
public class EntityName extends BaseModel {
    @Column(name = "field")
    private String field;
}

// APRÈS
import io.hearstcorporation.atelier.model.TenantAware;

public class EntityName extends BaseModel implements TenantAware {
    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;
    
    @Column(name = "field")
    private String field;
}
```

### Liste des entities restantes :

#### Users & Administration (3)
- [ ] `Token.java` - atelier_token
- [ ] `UserImage.java` - atelier_user_image
- [ ] `HallmarkLogo.java` - hallmark_logo

#### Inventory (16)
- [ ] `Gemstone.java` - gemstone
- [ ] `GemstoneImage.java` - gemstone_image
- [ ] `PureMetalSummary.java` - pure_metal_summary
- [ ] `PureMetalPurchase.java` - pure_metal_purchase
- [ ] `Alloy.java` - alloy
- [ ] `AlloyPurchase.java` - alloy_purchase
- [ ] `AlloyedMetal.java` - alloyed_metal
- [ ] `AlloyedMetalPurchase.java` - alloyed_metal_purchase
- [ ] `OtherMaterial.java` - other_material
- [ ] `OtherMaterialTransaction.java` - other_material_transaction

#### Orders (15)
- [ ] `Order.java` - atelier_order (si correspond à order_task)
- [ ] `OrderTask.java` - order_task
- [ ] `OrderTaskImage.java` - order_task_image
- [ ] `OrderTaskMetal.java` - order_task_metal
- [ ] `OrderMaterial.java` - order_material
- [ ] `OrderDiamond.java` - order_diamond
- [ ] `OrderLabour.java` - order_labour
- [ ] `OrderLabourTracker.java` - order_labour_tracker
- [ ] `OrderStock.java` - order_stock
- [ ] `OrderMetalCasting.java` - order_metal_casting
- [ ] `OrderProfit.java` - order_profit
- [ ] `OrderMetalTotal.java` - order_metal_total
- [ ] `OrderMetalProduction.java` - order_metal_production
- [ ] `OrderTechnicalSheet.java` - order_technical_sheet
- [ ] `OrderTechnicalSheetImage.java` - order_technical_sheet_image

#### Settings (9)
- [ ] `PriceSetting.java` - price_setting
- [ ] `Cylinder.java` - cylinder_setting
- [ ] `LabourSetting.java` - labour_setting
- [ ] `ItemCategory.java` - item_category
- [ ] `Collection.java` - collection
- [ ] `BusinessLocation.java` - business_location
- [ ] `Location.java` - location
- [ ] `Casting.java` - casting
- [ ] `GemsPayment.java` - gems_payment

## 🔧 Migration Corrective 079

**Problème identifié :** Migration 078 référençait des tables avec leurs anciens noms (avant renommage).

**Solution :** Migration `079_FIX_TENANT_ID_MISSING_TABLES.xml` créée pour ajouter `tenant_id` aux tables renommées :
- ✅ `atelier_order` (anciennement `project`)
- ✅ `order_image` (anciennement `project_image`)
- ✅ `cylinder` (anciennement `cylinder_setting`)
- ✅ `segment` (anciennement `category_piece`)

## 📝 Notes

### Tables sans entities trouvées (à vérifier)
Ces tables sont dans la migration mais n'ont pas d'entities Java correspondantes trouvées :
- `atelier_user_role` - Table de jointure (pas d'entity nécessaire)
- `order_task_file` - Table de jointure (pas d'entity nécessaire)
- `order_task_gemstone` - Table de jointure (pas d'entity nécessaire)
- `order_gemstone` - Table de jointure (pas d'entity nécessaire)

### Tables globales (PAS de tenant_id)
Ces tables ne doivent PAS être modifiées (données de référence partagées) :
- `atelier_role`
- `price_metal`
- `metal`
- `metal_caratage`
- `metal_casting`
- `metal_purity`
- `diamond_shape`
- `price`
- `client_category`
- `country`
- `currency`
- `segment`
- `shedlock`

## 🚀 Prochaines étapes

1. Modifier les 43 entities restantes
2. Vérifier les tables sans entities
3. Ajouter filtrage automatique (@Where clause) si nécessaire
4. Tests d'intégration

## ⚠️ Important

**Pour le moment, le filtrage par tenant est géré au niveau du filtre HTTP (`TenantFilter`).**
**Les entities ont la colonne `tenant_id` mais le filtrage automatique via `@Where` sera ajouté dans une phase ultérieure si nécessaire.**

Le filtrage actuel se fait via :
- `TenantContext` : Stocke le tenant_id dans ThreadLocal
- `TenantFilter` : Extrait et définit le tenant_id pour chaque requête
- Les repositories peuvent utiliser `TenantContext.getTenantId()` pour filtrer les queries


