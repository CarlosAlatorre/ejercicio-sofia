import {auth} from "@/firebase";

export const AuthService = {
  getMessageError: (code: string) => {
    console.log(code)

    switch (code) {
      case 'auth/email-already-exists':
        return 'Correo electrónico en uso.';

      case 'auth/invalid-email' :
        return 'Correo electrónico inválido.';

      case 'auth/operation-not-allowed':
        return 'Esta operación no está permitida.';

      case 'auth/weak-password':
        return 'Contraseña muy débil.';

      case 'auth/wrong-password':
        return 'Contraseña incorrecta';

      case 'auth/invalid-password':
        return 'Contraseña inválida, mínimo 6 caracteres';

      case 'auth/invalid-uid':
        return 'Usuario inválido';

      case 'auth/user-disabled':
        return 'Tu usuario ha sido bloqueado';

      case 'auth/user-not-found':
        return 'El usuario no fue encontrado, revise su correo electrónico';

      case 'auth/network-request-failed':
        return 'Error en la conexión';

      case 'auth/email-already-in-use':
        return 'El email ya está en uso';

      default:
        return `Pruebe de nuevo. Si el problema persiste contacte con el equipo de soporte: soporte@tecnologiasintech.com`;
    }
  },
  isAuthenticated: (): Promise<boolean> => {
    return new Promise(resolve => {
      auth.onAuthStateChanged((credentials) => {
        resolve(!!credentials)
      })
    })
  }
}
