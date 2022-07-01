import { EStatus } from '~/constants/status';
import { IDictionary } from '~/types/dictionary.interface';
import { IVehicleManufacturers, IVehicleModels, IVehileModifications, IVehicleTaxons, IVehicle, IVehicleByVin } from '~/types/vehicle.interface';

export interface IState {
    manufacturers: IVehicleManufacturers[] | [];
    models: IVehicleModels[] | [];
    modifications: IVehileModifications[] | [];
    taxons: IVehicleTaxons[] | [];
    status: EStatus;
    error: Error | null;
    modificationsCache: IDictionary<IVehicleModels[]>;
    manufacturerModelsCache: IDictionary<IVehicleModels[]>;
    vehicleModificationsCache: IDictionary<IVehileModifications[]>;
    vehicleTaxonsCache: IDictionary<IVehicleTaxons[]>
    vin: IVehicleByVin[] | []
}

export default (): IState => ({
    manufacturers: [],
    models: [],
    modifications: [],
    taxons: [],
    vin: [],
    status: EStatus.INIT,
    error: null,
    modificationsCache: {},
    manufacturerModelsCache: {},
    vehicleModificationsCache: {},
    vehicleTaxonsCache: {}
})
