sap.ui.controller("oup.ptp.zptppst.ext.controller.ListReportExt", {
  StockMovement: function (oEvent) {
    var aMaterialNumber = this.extensionAPI
      .getSelectedContexts()[0]
      .getProperty("Product"); // read PurchaseOrder from OData path Product/SupplierID

    var aPlant = this.extensionAPI
      .getSelectedContexts()[0]
      .getProperty("Plant"); // read Plant

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
  ZINF: function (oEvent) {
    var aMaterialNumber = this.extensionAPI
      .getSelectedContexts()[0]
      .getProperty("Product"); // read material number
    var aPlant = this.extensionAPI
      .getSelectedContexts()[0]
      .getProperty("Plant"); // read Plant
    var aSalesOrg = this.extensionAPI
      .getSelectedContexts()[0]
      .getProperty("sorg"); // read Sales Organisation
    var aDistributionChannel = this.extensionAPI
      .getSelectedContexts()[0]
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
    var aMaterialNumber = this.extensionAPI
      .getSelectedContexts()[0]
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
    var aPurchaseOrder = this.extensionAPI
      .getSelectedContexts()[0]
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

  onInit: function () {
    _sIdPrefix =
      "oup.ptp.zptppst::sap.suite.ui.generic.template.ListReport.view.ListReport::ZPTP_C_PO_SUMRY--";

    let oListReport = this.byId(_sIdPrefix + "listReport");
    oListReport.setShowFullScreenButton(true);
  },

  onAfterRendering: function () {
    const oContentTable = this.byId(_sIdPrefix + "GridTable");
    oContentTable.attachBusyStateChanged(this._onBusyStateChanged);
  },

  _onBusyStateChanged: function (oEvent) {
    const bBusy = oEvent.getParameter("busy");
    if (!bBusy) {
      const oTable = oEvent.getSource();
      let oTpc = null;
      // grid table
      if (sap.ui.table.TablePointerExtension) {
        oTpc = new sap.ui.table.TablePointerExtension(oTable);
      } else {
        oTpc = new sap.ui.table.extensions.Pointer(oTable);
      }
      // columns
      const aColumns = oTable.getColumns();
      for (let i = aColumns.length; i >= 0; i--) {
        oTpc.doAutoResizeColumn(i);
      }
      aColumns[aColumns.length - 1].setWidth("150px");
    }
  },
});
