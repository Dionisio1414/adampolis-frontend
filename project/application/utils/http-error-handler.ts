export default function httpErrorHandler(error: any): any {
    return ((error || {}).response || {}).data || error || null;
}
