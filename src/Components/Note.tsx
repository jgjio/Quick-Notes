import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { getThemeColor } from '../Theme/getTheme';
import { Screen } from '../Theme/Screen';
import { RootState } from '../Redux/store';
import { useAppDispatch, useAppSelector } from '../Hooks/redux';
import { saveNote } from '../Redux/NoteSlice';
import { HALF_MINUTE_TO_MS } from '../../constants/Constants';
interface Props {
  initialTitleContent: string;
  initialNoteContent: string;
}

const Note = ({
  initialTitleContent,
  initialNoteContent,
}: Props): React.ReactElement => {
  const note = useAppSelector((state: RootState) => state.notes);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(note.title || initialTitleContent);
  const [content, setContent] = useState(note.content || initialNoteContent);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(saveNote({ title: title, content: content }));
    }, HALF_MINUTE_TO_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  return (
    <Screen style={styles.screen}>
      <TextInput
        style={[styles.textInput, styles.title]}
        onChangeText={setTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={[styles.textInput, styles.content]}
        onChangeText={setContent}
        value={content}
        placeholder="Content"
        multiline={true}
        underlineColorAndroid="transparent"
      />
      <Text style={styles.text}>{note.savedMessage}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 2.5,
  },
  textInput: {
    backgroundColor: getThemeColor('textBackground'),
    color: getThemeColor('text'),
    fontSize: 18,
  },
  content: {
    marginTop: 2.5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 0,
    textAlignVertical: 'top',
    flex: 1,
  },
  text: {
    textAlignVertical: 'top',
    margin: 5,
    color: getThemeColor('text'),
  },
});

export default Note;
