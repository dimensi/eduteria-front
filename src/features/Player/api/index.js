import { recordApi } from 'src/api/helpers/recordApi'

export const getPresentation = async ({ id }) => {
  return (await recordApi({
    procedure: 'Api.PresentationGet',
    parameters: [
      {
        name: 'ID',
        type: 'bigint',
        value: 662774,
      },
    ],
    columns: [
      {
        name: 'PresentationID',
      },
      {
        name: 'PresentationName',
      },
      {
        name: 'PresentationDescription',
      },
      {
        name: 'StartSlideID',
      },
      {
        name: 'PresentationViewID',
      },
      {
        name: 'Slides',
        type: 'json',
      },
    ],
  })).recordset[0]
}

export const sendEventToBack = async ({ viewId, widgetId, order }) => {
  return recordApi({
    procedure: 'Api.PresentationEvent',
    parameters: [
      { name: 'PresentationViewID', value: viewId },
      { name: 'WidgetID', value: widgetId },
      { name: 'Order', value: order },
    ],
  })
}
