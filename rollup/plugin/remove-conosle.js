export default function removeConsole(){
    return {
        name: 'remove-console',
        transform(code,id){
            return {
                code: code.replace(/console\.log\(.*\)/g, ''),
            }
        }
    }
}