import { recordApi } from 'src/api/helpers/recordApi'

export const companyColumns = [
  { name: 'CompanyID' },
  { name: 'CompanyName' },
  { name: 'CompanyINN' },
]

export async function getCompanies({ size, page }) {
  // eslint-disable-next-line no-unused-vars
  const parameters = [
    {
      name: 'PageSize',
      value: size,
    },
    {
      name: 'PageNumber',
      value: page,
    },
  ]
  const { recordset } = await recordApi({
    procedure: 'Api.CompanyList',
    columns: companyColumns,
  })
  return recordset
}

export async function setCompany({ CompanyID, CompanyName, CompanyINN }) {
  const parameters = [
    Boolean(CompanyID) && { name: 'CompanyID', value: CompanyID },
    { name: 'CompanyName', value: CompanyName },
    { name: 'CompanyINN', value: CompanyINN },
  ].filter(Boolean)

  const {
    recordset: [record],
  } = await recordApi({
    procedure: 'Api.CompanySet',
    parameters,
    columns: companyColumns,
  })

  return record
}

export async function deleteCompany(id) {
  return recordApi({
    procedure: 'Api.CompanyDel',
    parameters: [{ name: 'CompanyID', value: `${id}` }],
  })
}
