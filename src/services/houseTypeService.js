import xhr from './xhr/'
class HouseTypeService {
  getHouseType(linkerId) {
    return xhr({
      url: '/linkerDetail/getHouseType',
      body: {
        linkerId
      }
    })
  }
}
export default new HouseTypeService()