import profileAPI from '../dataProviders/profile'
import ACTIONS from '../constants/actions'

export function getProfiles() {
  return async dispatch => {
    try {
      // const profiles = await profileAPI.get()
      const profiles = [
        {
          firstName: 'Eun Soo',
          lastName: 'Jung',
          email: 'eunsoojung@email.com',
          jobTitle: 'Software Engineer',
          skills: ['JAVA', 'Spring'],
          degree: 'Master of Science'
        },
        {
          firstName: 'Mason',
          lastName: 'Shin',
          email: 'masonshin@email.com',
          jobTitle: 'Software Engineer',
          skills: ['JavaScript', 'HTML'],
          degree: 'Master of Science'
        }
      ]
      dispatch({
        type: ACTIONS.GET_PROFILES,
        value: profiles
      })
    } catch(err) {
      console.error(err)
    }
  }
}
