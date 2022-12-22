import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  postContainer: {
    border: 1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 350,
    borderRadius: 5,
  },
  commentsContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 350,
    borderRadius: 5,
  },
  commentsText: {
    color: 'gray',
  },
  commentsInput: {
    border: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 125,
    textAlignVertical: 'top',
    padding: 10,
  },
  settingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 15
  },
  submit: {
    backgroundColor: 'white',
    width: 125,
    border: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
  },
  submitText: {
    color: 'black', 
    fontWeight: '600',
  }
});

export default styles