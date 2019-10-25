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
        name: 'StartSlideId',
      },
      {
        name: 'Slides',
        type: 'json',
      },
    ],
  })).recordset[0]
}
