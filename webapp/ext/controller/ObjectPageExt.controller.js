let _sIdPrefix, _sIdPrefixUnitCost;

sap.ui.controller("oup.ptp.zptppst.ext.controller.ObjectPageExt", {
  onInit: function () {
    _sIdPrefix =
      "oup.ptp.zptppst::sap.suite.ui.generic.template.ObjectPage.view.Details::ZPTP_C_PO_SUMRY--to_poitem::com.sap.vocabularies.UI.v1.LineItem::Table";
    _sIdPrefixUnitCost =
      "oup.ptp.zptppst::sap.suite.ui.generic.template.ObjectPage.view.Details::ZPTP_C_PO_SUMRY--to_UnitCost::com.sap.vocabularies.UI.v1.LineItem::Table";

    // po items
    let oTable = this.byId(_sIdPrefix);
    oTable.setShowFullScreenButton(true);

    // unit const
    oTable = this.byId(_sIdPrefixUnitCost);
    oTable.setShowFullScreenButton(true);
  },

  onAfterRendering: function () {
    const oContentTable = this.byId(_sIdPrefix);
    const oContentTableUnitCost = this.byId(_sIdPrefixUnitCost);

    this._onBusyStateChanged(oContentTable, oContentTableUnitCost); //.attachBeforeRebindTable(this._onBusyStateChanged);
  },

  StockMovement: function (oEvent) {
    var aMaterialNumber = this.getView()
      .getBindingContext()
      .getProperty("Product"); // read PurchaseOrder from OData path Product/SupplierID

    var aPlant = this.getView().getBindingContext().getProperty("Plant"); // read Plant

    var oCrossAppNavigator = sap.ushell.Container.getService(
      "CrossApplicationNavigation"
    ); // get a handle on the global XAppNav service
    var hash =
      (oCrossAppNavigator &&
        oCrossAppNavigator.hrefForExternal({
          target: {
            semanticObject: "Material",
            action: "manageStock",
          },
          params: {
            Material: aMaterialNumber,
            Plant: aPlant,
          },
        })) ||
      ""; // generate the Hash to display a Supplier

    oCrossAppNavigator.toExternal({
      target: {
        shellHash: hash,
      },
    }); // navigate to Supplier application
  },

  ZINFObjectPage: function (oEvent) {
    var aMaterialNumber = this.getView()
      .getBindingContext()
      .getProperty("Product"); // read material number
    var aPlant = this.getView().getBindingContext().getProperty("Plant"); // read Plant
    var aSalesOrg = this.getView().getBindingContext().getProperty("sorg"); // read Sales Organisation
    var aDistributionChannel = this.getView()
      .getBindingContext()
      .getProperty("distChanl"); // read Distribution Channel
    var oCrossAppNavigator = sap.ushell.Container.getService(
      "CrossApplicationNavigation"
    ); // get a handle on the global XAppNav service
    var hash =
      (oCrossAppNavigator &&
        oCrossAppNavigator.hrefForExternal({
          target: {
            semanticObject: "MATINQ",
            action: "manage",
          },
          params: {
            ISBN: aMaterialNumber,
            Plant: aPlant,
            SalesOrganization: aSalesOrg,
            DistributionChannel: aDistributionChannel,
          },
        })) ||
      ""; // generate the Hash to display a Supplier

    oCrossAppNavigator.toExternal({
      target: {
        shellHash: hash,
      },
    }); // navigate to Supplier application
  },

  StockOverview: function (oEvent) {
    var aMaterialNumber = this.getView()
      .getBindingContext()
      .getProperty("Product"); // read material Number
    var oCrossAppNavigator = sap.ushell.Container.getService(
      "CrossApplicationNavigation"
    ); // get a handle on the global XAppNav service
    var hash =
      (oCrossAppNavigator &&
        oCrossAppNavigator.hrefForExternal({
          target: {
            semanticObject: "Material",
            action: "displayStockOverview",
          },
          params: {
            Material: aMaterialNumber,
          },
        })) ||
      ""; // generate the Hash to display a Supplier

    oCrossAppNavigator.toExternal({
      target: {
        shellHash: hash,
      },
    }); // navigate to Supplier application
  },

  ReceiptAdvances: function (oEvent) {
    var aPurchaseOrder = this.getView()
      .getBindingContext()
      .getProperty("PurchaseOrder"); // read PurchaseOrder from OData path
    var oCrossAppNavigator = sap.ushell.Container.getService(
      "CrossApplicationNavigation"
    ); // get a handle on the global XAppNav service
    var hash =
      (oCrossAppNavigator &&
        oCrossAppNavigator.hrefForExternal({
          target: {
            semanticObject: "ZACR",
            action: "manage",
          },
          params: {
            PurchasingDocument: aPurchaseOrder,
          },
        })) ||
      ""; // generate the Hash to display a Receipt Advances

    oCrossAppNavigator.toExternal({
      target: {
        shellHash: hash,
      },
    }); // navigate to ReceiptAdvances application
  },

  _onBusyStateChanged: function (oContentTable, oContentTableUnitCost) {
    //const bBusy = oEvent.getParameter("busy");
    //if (!bBusy) {

    const oTable = oContentTable.getTable();
    const oTableUnitCost = oContentTableUnitCost.getTable();
    let oTpc = null;

    // grid table
    if (sap.ui.table.TablePointerExtension) {
      oTpc = new sap.ui.table.TablePointerExtension(oTable);
      oTpcUnit = new sap.ui.table.TablePointerExtension(oTableUnitCost);
    } else {
      oTpc = new sap.ui.table.extensions.Pointer(oTable);
      oTpcUnit = new sap.ui.table.TablePointerExtension(oTableUnitCost);
    }

    // columns
    const aColumns = oTable.getColumns();
    for (let i = aColumns.length; i >= 0; i--) {
      oTpc.doAutoResizeColumn(i);
    }

    // po line items table

    // vendor
    aColumns[3].setWidth("300px");

    // delivery to
    aColumns[5].setWidth("200px");

    // storage location
    aColumns[6].setWidth("200px");

    // columns
    const aColumnsUnit = oTableUnitCost.getColumns();
    for (let j = aColumnsUnit.length; j >= 0; j--) {
      oTpcUnit.doAutoResizeColumn(j);
    }

    // unit cost

    // description
    aColumnsUnit[1].setWidth("300px");
  },
});
