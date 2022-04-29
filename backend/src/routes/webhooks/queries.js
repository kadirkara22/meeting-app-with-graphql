export const GET_MEETING_PARTICIPANTS = `
query gerPariticipant($id:Int!) {
    meetings_by_pk(id:$id){
      title
      meeting_date
        user{
          email
          fullName
        }
        participants{
          user{
            email
          }
        }
      }
  }
`

export const GET_MEETING_PARTICIPANTS_REMINDER_QUERY = `
query getPariticipant($id:Int!) {
  meetings_by_pk(id:$id){
    user{
      email
      fullName
    }
    participants(where:{is_approved:{_eq:true}}){
      user{
        email
        fullName
      }
    }
  }
  }
`