
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { useSelector } from 'react-redux';
export default function App() {
  let [Input, setInput] = useState('')
  let [tasks, setTasks] = useState([])
  let [id, setId] = useState(1);
  const todo = store.getState()
  console.log(todo)
  const deleteTask = (id) => {

    setTasks(tasks.filter(item => item.id != id))
  }
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={{ marginTop: 160 }}></View>
        <Text style={styles.heading}>Todo App</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter your task "
            value={Input}
            onChangeText={setInput}
          />
          <Pressable style={styles.button} onPress={() => {
            // setTasks([...tasks, { id: id, name: Input }])

            setId(id + 1);
            store.dispatch({ type: 'ADDTASK', payload: { id: id, name: Input } });
            setInput('');
            window.location.href="/";
          }}>
            <Text style={styles.buttonText} >Add Task</Text>
          </Pressable>

          <ScrollView style={styles.listbox}>
            {todo.map((item) => (
              <View key={item.id} style={styles.listitem}>
                <Text style={styles.itemname}>{item.name} </Text>
                <Icon name='delete' color="red" onPress={() => store.dispatch({ type: 'DELETETASK', payload: { id: item.id } })} />
              </View>
            ))}
          </ScrollView>
        </View>


      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {

    fontSize: 35,
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    color: '#03758c',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontSize: 18,

  },
  button: {
    padding: 10,
    backgroundColor: '#77c3e0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  buttonText: {
    fontSize: 16,
  },
  listbox: {
    margin: 10,
    height: 180,
    display: 'flex',
    flexWrap: 'wrap',
  },
  listitem: {
    display: 'flex',
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 9,
    marginBottom: 9,
    marginRight: 9,
    backgroundColor: '#edf6f7',
    borderColor: '#aeb5b0',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderRadius: 3,
  },
  itemname: {
    fontSize: 19,
  }
});
