import { ITestimonial } from '~/types/testimonial.interface';

export interface IState {
    testimonial: ITestimonial[]
}

export default (): IState => ({
    testimonial: []
})
